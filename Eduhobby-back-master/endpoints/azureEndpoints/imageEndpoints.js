import { getSasUrl, storeMetadata, uploadStream } from "../utils/mongoAndAzureUtils.js";
import { makeRequestToDB } from "../../server.js";

export default async (fastify) => {
    fastify.post('/category-image', async (req, res) => {
        try {
            const data = await req.file();
            
            console.log(data);
            const isImage = data.mimetype.includes('image');
            const imageUrl = await uploadStream(data.filename, data.file, data.mimetype, data.file.length, isImage);
            console.log(imageUrl);
            const imageId = await storeMetadata(data.filename, data.encoding, data.mimetype, isImage);
            return res.status(200).send({ imageId });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: 'Server error'});
        }
    });

    fastify.get('/category-image/:id', async (req, res) => {
        const { id } = req.params;
        const categoryResponse = await makeRequestToDB.$collection('imagemetadatas').
            findOne({ filter: {
                _id: { $oid: id }
            }});

        if(!categoryResponse.document) return res.status(404).send({ msg: 'Image not found'});
        const blobName = categoryResponse.document.name;

        const sasUrl = getSasUrl(`categoryImages/${blobName}`);
        return res.status(200).send({sasUrl});
    });
};