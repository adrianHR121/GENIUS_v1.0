import { makeRequestToDB } from "../../server.js";
import { getSasUrl, storeMetadata, uploadStream } from "../utils/mongoAndAzureUtils.js";
import { authMiddleware } from "../authMiddleware.js";

export default async (fastify) => {
    fastify.post('/videos', async (req, res) => {
        try {
            const data = await req.file();

            const isImage = data.mimetype.includes('image');
            const vidUrl = await uploadStream(data.filename, data.file, data.mimetype, data.file.length, isImage);

            console.log(data.filename, data.encoding, data.mimetype, vidUrl);
            const videoId = await storeMetadata(data.filename, data.encoding, data.mimetype, isImage);
            return res.status(200).send({ videoId });
        } catch (error) {
            console.log(error);
            return res.status(500).send({response: 'video upload error', msg: error});
        }
    });

    fastify.post('/get-video', { preHandler: authMiddleware }, async (req, res) => {
        console.log(req.body);
        if (!req.body.videoId) return res.status(400).send({ error: 'blobName not specified' });
        try {
            const videoId = req.body.videoId;
            const videoResponse = await makeRequestToDB.$collection('videometadatas')
                .findOne({ filter: {_id: {$oid: videoId}} });

            if(!videoResponse) return res.status(403).send({msg: 'Video not found'});
            const blobName = videoResponse.document.name;

            const sasUrl = getSasUrl(blobName);
            return res.status(200).send({sasUrl});
        } catch (error) {
            console.log(error);
            return res.status(500).send({error});
        }
    });
};
