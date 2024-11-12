export const API_URL = 'https://eduhobby-back.vercel.app/register';

export const registerUser = async (formData, isAlumnoSelected) => {
    const { nombre, apellido, email, password, cedula } = formData;
    const type = isAlumnoSelected ? 'student' : 'professor';
    const data = isAlumnoSelected
        ? { firstNames: nombre, lastNames: apellido, email, password, type }
        : { firstNames: nombre, lastNames: apellido, email, professionalId: cedula, password, type };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const responseData = await response.json();

        if (response.ok) {
            return { success: true, data: responseData, type };
        } else {
            // Ajustar el mensaje para que se muestre correctamente
            const errorMessage = responseData.msg || 'Error desconocido';
            return { success: false, message: errorMessage };
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return { success: false, message: 'Algo salió mal!' };
    }
};

