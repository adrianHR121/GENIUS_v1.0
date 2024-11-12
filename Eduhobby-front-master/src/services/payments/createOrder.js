import { BASE_URL, ENDPOINTS } from "../config";

const createOrder = (body, queryParams, method = 'POST') => {
    const url = `${BASE_URL}/${ENDPOINTS.PAYMENTS}/create-order?${queryParams ?? ''}`;
    console.log(url);
    return fetch(url, {
        method,
        body: JSON.stringify({...body}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export default createOrder;