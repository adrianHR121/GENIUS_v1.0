import Cookies from 'js-cookie';

const API_URL = 'https://eduhobby-back.vercel.app';

const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
};

const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return false;

    try {
        const response = await fetch(`${API_URL}/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            Cookies.set('accessToken', data.accessToken, { expires: 1, sameSite: 'strict', secure: true });
            return true;
        }
    } catch (error) {
        console.error('Failed to refresh token:', error);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('type');
    }

    return false;
};

const fetchWithAuth = async (url, options = {}) => {
    let accessToken = Cookies.get('accessToken');

    if (isTokenExpired(accessToken)) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            accessToken = Cookies.get('accessToken');
        } else {
            throw new Error('Token refresh failed');
        }
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,
            ...(options.body && { 'Content-Type': 'application/json' }),
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ Error: 'Unknown error' }));
        throw new Error(error.Error || 'Network response was not ok');
    }

    return response;
};

export const createCourse = async (courseData) => {
    try {
        const response = await fetchWithAuth(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify(courseData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'Error al crear el curso';
            throw new Error(errorMessage);
        }

        return response; // Retornamos el objeto Response original
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export const fetchCourses = async () => {
    const userDataCookie = Cookies.get('userData');
    let professorId = null;

    if (userDataCookie) {
        try {
            const userData = JSON.parse(decodeURIComponent(userDataCookie));
            professorId = userData._id; // Asegúrate de acceder correctamente al campo _id
        } catch (error) {
            console.error('Failed to parse user data from cookies:', error);
        }
    }

    if (!professorId) {
        throw new Error('Professor ID not found in cookies');
    }

    try {
        const response = await fetchWithAuth(`${API_URL}/courses/professor/${professorId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching courses');
        }

        const data = await response.json();
        const courses = data.documents; // Extraer el array de cursos del campo documents
      
        return courses;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await fetchWithAuth(`${API_URL}/courses/${courseId}`, {
            method: 'DELETE',
        });

        return response.json();
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

export const updateCourse = async (courseId, courseData) => {
    try {
        const response = await fetchWithAuth(`${API_URL}/courses/${courseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify(courseData),
        });

        return response.json();
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};
