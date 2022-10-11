import http from "../helper/interceptor";

export const loginUser = (payload) => http.post('/api/login', payload)
export const logoutUser = () => http.post('/api/logout')
export const updateProfile = (payload) => http.post('/api/updateUserProfile', payload)