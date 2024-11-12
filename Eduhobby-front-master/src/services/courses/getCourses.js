import fetchCourses from "./coursesService";
import Cookies from 'js-cookie';

const getCourses = async (refreshToken, body, queryParams) => {
    try {
        // Primera llamada para obtener los cursos
        let response = await fetchCourses(body, queryParams, 'GET');
        let responseJson = await response.json();

        // Si hay un error, intentamos refrescar el token
        if (responseJson.Error) {
            // Intentamos refrescar el token
            await refreshToken(Cookies.get('refreshToken'));

            // Hacemos una nueva solicitud con el token renovado
            response = await fetchCourses(body, queryParams, 'GET');
            responseJson = await response.json();
        }

        // Verificamos si la respuesta tiene la estructura correcta (un campo "documents" con un array)
        if (responseJson && Array.isArray(responseJson.documents)) {
            return responseJson.documents;  // Devolvemos los cursos en "documents"
        } else {
            // En caso de que la respuesta no sea la esperada
            console.error('Error: Formato de respuesta inesperado', responseJson);
            return [];
        }
    } catch (error) {
        // Si ocurre un error en todo el proceso
        console.error('Error en getCourses:', error);
        return [];
    }
}

export default getCourses;
