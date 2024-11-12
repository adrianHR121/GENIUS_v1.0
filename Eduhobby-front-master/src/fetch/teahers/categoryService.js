const API_URL = 'https://eduhobby-back.vercel.app';

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/all-categories`);
        if (!response.ok) {
            throw new Error('Error al obtener las categorías');
        }
        const { docs } = await response.json(); // Desestructuramos docs
        return docs; // Retornamos solo los documentos
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Actualizar categoría
export const updateCategory = async (updatedCategory) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCategory),
    });
    if (!response.ok) throw new Error('Error al actualizar la categoría');
    return await response.json();
};

// actualisar imagen de categoría
export const uploadCategoryImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);  // Asegúrate de que el archivo se agregue correctamente a formData

        const response = await fetch(`${API_URL}/category-image`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen de la categoría');
        }

        // Devuelve la respuesta de la imagen (imageId)
        return await response.json();
    } catch (error) {
        console.error('Error al cargar la imagen de categoría:', error);
        throw error;
    }
};


export const getCategoryImage = async (imageId) => {
    try {
        
        // console.log('ID de imagen enviado:', imageId);

        const response = await fetch(`${API_URL}/category-image/${imageId}`); // Corrige la URL
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const categoryData = await response.json();

        
        // console.log('Respuesta de la API:', categoryData);

      
        return categoryData.sasUrl || 'https://blog.sinapsis.agency/wp-content/uploads/2021/04/DEFINICIONES.-ERROR-404.png';
    } catch (error) {
        console.error('Error al obtener la imagen de la categoría', error);
        return 'https://blog.sinapsis.agency/wp-content/uploads/2021/04/DEFINICIONES.-ERROR-404.png'; 
    }
};



