import createPayment from "./createPayment";

export default async (tokenId) => 
    await (await createPayment({}, tokenId, '', 'GET')).json()