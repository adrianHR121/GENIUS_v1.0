import { makeRequestToDB } from "../../server.js";

export default async (fastify) => {
    fastify.get('/cost', async (req, res) => {
        const array = await makeRequestToDB.$collection('costs').find({ filter: {}});
        return res.status(200).send({docs: array.documents});
    });

    fastify.get('/cost/:months', async (req, res) => {
        const { months } = req.params;
        console.log(months);
        const doc = await makeRequestToDB.$collection('costs').findOne({ filter: { subDurationMonths: Number(months) }});
        if(!doc.document) return res.status(403).send({msg: 'Cost non existent'});
        return res.status(200).send({doc: doc.document});
    });
};