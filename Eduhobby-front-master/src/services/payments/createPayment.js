import { BASE_URL, ENDPOINTS } from "../config";

const createOrder = (body, params, queryParams, method = 'POST') => {
    const url = `${BASE_URL}/${ENDPOINTS.PAYMENTS}/pay/${params}?${queryParams ?? ''}`;
    console.log(url);
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export default createOrder;