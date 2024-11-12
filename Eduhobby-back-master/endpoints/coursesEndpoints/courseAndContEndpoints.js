import Course, { validateCourseSchema } from '../../schemas/courses/course.js';
import Content, { validateContentSchema } from '../../schemas/courses/courseCont.js';
import { authMiddleware } from '../authMiddleware.js';
import { makeRequestToDB } from '../../server.js';

export default async (fastify) => {
    const COLLECTION_STRING = 'courses';
    const collection = makeRequestToDB.$collection(COLLECTION_STRING);
    // Crear un Curso
    fastify.post('/courses', { preHandler: authMiddleware }, async (req, res) => {
        const { title, description, category, content, professor, imageUrl } = req.body;

        if (!title || !description || !category || !professor) {
            return res.status(400).send('Missing properties');
        }

        try {
            const courseData = { title, description, category, content, professor, imageUrl };

            const newCourse = validateCourseSchema(courseData);
            if(!newCourse) return res.status(400).send({ message: validateCourseSchema.errors });

            const response = await collection
                .insertOne({
                    document: {
                        ...courseData,
                        category: { $oid: courseData.category },
                        professor: { $oid: courseData.professor},
                        content: courseData.content ? courseData.content.map(id => ({ $oid: id })) : [],
                        creationDate: { $date: new Date(courseData.creationDate).toISOString() },
                    },
                });
            if (!response) return res.status(400).send({ message: 'Error creating course'});

            return res.status(201).send(response);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Actualizar un Curso
    fastify.put('/courses/:id',  { preHandler: authMiddleware }, async (req, res) => {
        const { id } = req.params;
        const { title, description, category, content, imageUrl } = req.body;
        const courseData = { title, description, category, imageUrl };

        const pushContent = content && content.length > 0 ? {$push:{content: { $each: content.map(id => ({ $oid: id }))}}} : {};
        try {
            const response = await collection
                .updateOne({
                    filter: {_id: {$oid: id}},
                    update: {
                        $set:{...courseData},
                        ...pushContent
                    },
                    upsert: false
                });
            if (response.matchedCount === 0) return res.status(400).send({ message: 'Course not found'});

            return res.status(200).send(response);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Eliminar un Curso
    fastify.delete('/courses/:id',  { preHandler: authMiddleware }, async (req, res) => {
        const { id } = req.params;

        try {
            const deletedCourse = await Course.findByIdAndDelete(id);

            if (!deletedCourse) {
                return res.status(404).send('Course not found');
            }

            return res.status(200).send(deletedCourse);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Listar Todos los Cursos
    fastify.get('/courses',  /*{ preHandler: authMiddleware },*/ async (req, res) => {
        try {
            const courses = await makeRequestToDB.course.aggregate({ pipeline:[
                {
                    $lookup: {
                        from: "professors",
                        localField: "professor",
                        foreignField: "_id",
                        as: "professorDetails"
                    }
                },
                {
                    $lookup: {
                        from: "contents",
                        localField: "content",
                        foreignField: "_id",
                        //let: { contentIds: "$content" },
                        //pipeline: [
                        //    {
                        //        $match: {
                        //            $expr: {
                        //                "$_id":{ $in: "$$contentIds" } ,
                        //            }
                        //        }
                        //    }
                        //],
                        as: "contentDetails"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        let: { categoryId: "$category" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [{ $toObjectId :"$$categoryId"} , "$_id"]
                                    }
                                }
                            }
                        ],
                        as: "categoryDetails"
                    }
                }
            ]});
            console.log(courses);
            return res.status(200).send(courses);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Listar Todos los Cursos por professor id
    fastify.get('/courses/professor/:pId',  /*{ preHandler: authMiddleware },*/ async (req, res) => {
        const { pId } = req.params;

        try {
            const courseResponse = await makeRequestToDB.course.aggregate({ pipeline:[
                {
                    $match: {
                        professor : { $oid: pId }
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        let: { categoryId: "$category" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [{ $toObjectId :"$$categoryId"} , "$_id"]
                                    }
                                }
                            }
                        ],
                        as: "course"
                    }
                }
            ]});
            
            if (!courseResponse) return res.status(400).send({ message: 'Error getting courses'});

            return res.status(200).send(courseResponse);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Obtener un Curso por ID
    fastify.get('/courses/:id',  { preHandler: authMiddleware }, async (req, res) => {
        const { id } = req.params;

        try {
            const course = await Course.findById(id).populate('professor').populate('content');

            if (!course) {
                return res.status(404).send('Course not found');
            }

            return res.status(200).send(course);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Agregar Contenido a un Curso
    fastify.post('/courses/:courseId/content',  { preHandler: authMiddleware }, async (req, res) => {
        const { courseId } = req.params;
        const { title, videoId } = req.body;

        if (!title || !videoId) {
            return res.status(400).send('Missing properties');
        }
        
        const contentData = { title, video: videoId, course: courseId };
        const newContentSchema = validateContentSchema(contentData);
        if(!newContentSchema) return res.status(400).send({msg: validateContentSchema.errors});

        try {
            const contentResponse = await makeRequestToDB.$collection('contents')
                .insertOne({
                    document: {
                        title: contentData.title,
                        video: {$oid: contentData.video},
                        course: {$oid: contentData.course},
                        creationDate: { $date: new Date(contentData.creationDate).toISOString() }
                    },
                });
            if (contentResponse.matchedCount === 0) return res.status(500).send({ message: 'content error'});

            const courseResponse = await collection.updateOne({
                filter: {_id: {$oid: courseId}},
                update: { $push:{content: { $each: [contentResponse.insertedId].map(id => ({ $oid: id }))}}},
                upsert: false
            });
            if (courseResponse.matchedCount === 0) return res.status(400).send({ message: 'Course not found'});

            return res.status(201).send(contentResponse);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Actualizar Contenido del Curso
    fastify.put('/content/:id',  { preHandler: authMiddleware }, async (req, res) => {
        const { id } = req.params;
        const { title, videoUrl } = req.body;

        try {
            const updatedContent = await Content.findByIdAndUpdate(id, {
                title,
                videoUrl
            }, { new: true });

            if (!updatedContent) {
                return res.status(404).send('Content not found');
            }

            return res.status(200).send(updatedContent);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

    // Eliminar Contenido del Curso
    fastify.delete('/content/:id',  { preHandler: authMiddleware }, async (req, res) => {
        const { id } = req.params;

        try {
            const deletedContent = await Content.findByIdAndDelete(id);

            if (!deletedContent) {
                return res.status(404).send('Content not found');
            }

            await Course.findByIdAndUpdate(deletedContent.course, { $pull: { content: id } });

            return res.status(200).send(deletedContent);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

};
