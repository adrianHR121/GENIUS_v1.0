import createOrder from "./createOrder";

export default async (cost, baseUrl) => 
    await (await createOrder({cost, baseUrl})).json()