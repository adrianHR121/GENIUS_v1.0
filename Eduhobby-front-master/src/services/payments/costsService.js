import { BASE_URL, ENDPOINTS } from "../config";

const fetchCosts = (body, queryParams, method = 'POST') => {
    const url = `${BASE_URL}/${ENDPOINTS.COSTS}?${queryParams ?? ''}`;
    console.log(url);
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
export default fetchCosts;