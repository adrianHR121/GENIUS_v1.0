import { BASE_URL, ENDPOINTS } from "../config";

const verificationService = (token) => {
    const url = `${BASE_URL}/${ENDPOINTS.VERIFICATION}`;
    console.log(url);
    return fetch(url, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
        },
    });
}
export default verificationService;