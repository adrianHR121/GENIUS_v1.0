import { getPaypalToken } from "../Paypal/AuthPaypal.js";
import { validateCostSchema } from "../schemas/catalogs/cost.js";
import { authMiddleware } from "./authMiddleware.js";
import { order } from "./utils/paypalObjects.js";
import { subscribe } from "./utils/subcripcionIUtils.js";

export default async (fastify) => {
    fastify.post('/payment/create-order', async (req, res) => {
        const { cost, baseUrl } = req.body;

        const item = validateCostSchema(cost);

        if(!item) return res.status(403).send({ errors: validateCostSchema.errors });

        const body = JSON.stringify(order(cost, baseUrl));

        const token = await getPaypalToken();
        const tokenDecoded = await token.json();
        const response = await fetch(`${process.env.PAYPAL_SANDBOX_URL}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenDecoded.access_token}`
            },
            body,
        });

        const responseJson = await response.json();

        const toSend = responseJson.links[1];
        
        return res.status(200).send({ link: toSend.href});
    });

    fastify.get('/payment/pay/:orderId',{ preHandler: authMiddleware } ,async (req, res) => {
        const { orderId } = req.params;
        const studentId = req.user.userId;
        try {
            const token = await getPaypalToken();
    
            const tokenDecoded = await token.json();
            const response = await fetch(`${process.env.PAYPAL_SANDBOX_URL}/v2/checkout/orders/${orderId}/capture`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenDecoded.access_token}`
                },
            });
            
            const responseJson = await response.json();
            console.log("repsonse josn: ");
            console.log(responseJson);

            const status = responseJson.status;
            if(status !== "COMPLETED") return res.status(500).send({ msg: 'Error in payment'});

            const result = await subscribe(studentId, responseJson.id);
            if(!result.success) return res.status(403).send({ msg: result.msg });

            return res.status(200).send({ status });
        } catch (error) {
            console.log(error);
            console.error(error.msg);
            
            return res.status(500).send({msg: 'server error, could not complete payment'});
        }
    });

    //just for testing
    fastify.get('/auth-paypal', async (req, res) => {
        const token = await getPaypalToken();
        const tokenDecoded = await token.json();
        console.log(tokenDecoded);
        return res.status(200).send({tokenDecoded});
    });
};