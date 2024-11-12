import { BASE_URL, ENDPOINTS } from "../config";
import Cookies from 'js-cookie';

const fetchCourses = (body, queryParams, method = 'POST') => {
    const url = `${BASE_URL}/${ENDPOINTS.COURSES}?${queryParams ?? ''}`;
    console.log(url);
    return fetch(url,{
        method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
    });
}
export default fetchCourses;
