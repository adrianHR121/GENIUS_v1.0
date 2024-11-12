// src/services/apiService.js
import Cookies from 'js-cookie';

// Base URL
const API_URL = 'https://eduhobby-back.vercel.app';

// Endpoints
const ENDPOINTS = {
    PROFESSOR_REQUESTS: 'professor-requests',
    APPROVE_PROFESSOR: 'approve-professor',
    REJECT_PROFESSOR: 'reject-professor',
};

// Fetch professor requests
export const fetchProfessorRequests = async () => {
    try {
        const response = await fetch(`${API_URL}/${ENDPOINTS.PROFESSOR_REQUESTS}`);
        if (!response.ok) {
            throw new Error('Failed to fetch professor requests');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching professor requests:', error);
        throw error;
    }
};

// Approve professor request
export const approveProfessorRequest = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${ENDPOINTS.APPROVE_PROFESSOR}/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}) 
        });

        const textResponse = await response.text(); 

        if (!response.ok) {
            throw new Error(textResponse); 
        }

        return textResponse; 

    } catch (error) {
        console.error('Error approving professor request:', error);
        throw error; 
    }
};






// Reject professor request
export const rejectProfessorRequest = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${ENDPOINTS.REJECT_PROFESSOR}/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to reject professor request');
        }
        return await response.json();
    } catch (error) {
        console.error('Error rejecting professor request:', error);
        throw error;
    }
};
