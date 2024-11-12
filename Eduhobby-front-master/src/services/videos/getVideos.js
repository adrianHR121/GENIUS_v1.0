import fetchVideos from "./videoService";
import Cookies from 'js-cookie';

const getVideos = async (refreshToken, body, queryParams) => {
    console.log(body);
    try {
        let response = await fetchVideos(body, queryParams);
        console.log(response);
        let responseJson = await response.json();
        if (responseJson.Error || responseJson.error) {
            await refreshToken(Cookies.get('refreshToken'));
            response = await fetchVideos(body, queryParams);
            responseJson = await response.json();
            console.log(responseJson);
        }
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default getVideos;