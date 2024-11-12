const API_URL = "https://eduhobby-back.vercel.app";

export const getAllCosts = async () => {
    try {
        const response = await fetch(`${API_URL}/cost`);
        if (!response.ok) {
            throw new Error('Error fetching costs');
        }
        const { docs } = await response.json(); // Desestructuramos docs
        return docs; // Retornamos solo los documentos
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
