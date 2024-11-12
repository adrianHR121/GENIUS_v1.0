import { subscribe } from "./utils/subcripcionIUtils.js";

export default async (fastify) => {
    fastify.post('/subscription', async (req, res) => {
        const { studentId } = req.body;
        const result = await subscribe(studentId);
        if(!result.success) return res.status(403).send({ msg: result.msg });

        return res.status(200).send({ msg: 'Subscription added!' });
    });
};