export const BASE_URL = window.location.href.includes('debug=true') ? 'http://localhost:3001':'https://eduhobby-back.vercel.app'
export const BASE_PAYPAL_REDIRECT_URL = window.location.href.includes('debug=true') ? 'http://localhost:3000':'https://eduhobby-front.vercel.app'

export const ENDPOINTS = {
    COURSES: 'courses',
    VIDEOS: 'get-video',
    VERIFICATION: 'verify',
    PAYMENTS: 'payment',
    COSTS: 'cost'
}