// src/services/notificationService.js

const API_URL = 'https://eduhobby-back.vercel.app/professor-requests';

export const fetchNotifications = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};
