import { BASE_URL, ENDPOINTS } from "../config";
import Cookies from 'js-cookie';

const fetchVideos = (body, queryParams, method = 'POST') => {
    const url = `${BASE_URL}/${ENDPOINTS.VIDEOS}?${queryParams ?? ''}`;
    console.log(url);
    return fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
    });
}
export default fetchVideos;