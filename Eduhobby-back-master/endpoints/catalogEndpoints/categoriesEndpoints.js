import { validateCategoriesSchema } from "../../schemas/catalogs/category.js";
import { makeRequestToDB } from "../../server.js";

export default async (fastify) => {
    fastify.get('/all-categories', async (req, res) => {
        const array = await makeRequestToDB.$collection('categories').find({ filter: {}});
        return res.status(200).send({docs: array.documents});
    });

    fastify.get('/get-one-category/:categoryId', async (req, res) => {
        const { categoryId } = req.params;
        console.log(categoryId);
        const doc = await makeRequestToDB.$collection('categories').findOne({ filter: { ID: Number(categoryId) }});
        if(!doc.document) return res.status(403).send({msg: 'Category non existent'});
        return res.status(200).send({document: doc.document});
    });

    fastify.put('/categories', async (req, res) => {
        const { id, imageId, name, ID } = req.body;
        const categoriesResponse = await makeRequestToDB.$collection('categories')
            .updateOne({ filter: {_id: {$oid: id}},
                update:{
                    $set: {
                        name,
                        ID,
                        imageId: imageId ? { $oid: imageId } : undefined
                    }
                },
                upsert: false
            });
        console.log(categoriesResponse);
            
        if(!categoriesResponse) return res.status(500).send({msg: 'Error updating category'});
        return res.status(200).send({msg: 'Category updated'});
    });

    fastify.post('/categories', async (req, res) => {
        const newCategory = req.body;
        try {
            if(!newCategory.ID) {
                const lastCategoryID = await makeRequestToDB.$collection('categories')
                    .find({filter: {}, sort: { ID: -1}, limit:1});
                console.log(lastCategoryID);
                newCategory.ID = Number(lastCategoryID.documents[0].ID) +1;
            }

            var verifiedCategory = validateCategoriesSchema(newCategory);
            if(!verifiedCategory) return res.status(401).send({ error: validateCategoriesSchema.errors});

            const {imageId, ...rest} = newCategory;
            const categoryResponse = await makeRequestToDB.$collection('categories')
                .insertOne({ document: { ...rest, imageId: imageId ? { $oid: imageId } : undefined }});

            if(!categoryResponse.insertedId) return res.status(500).send({msg: 'Error inserting category'});
            return res.status(200).send({msg: `Category registered: ${categoryResponse.insertedId}`});
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'Server error'});
        }
        
    });
};