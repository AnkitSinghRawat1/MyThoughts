import http from "../http";

export const loginUser = (payload) => http.post('/api/login', payload)
export const logoutUser = () => http.post('/api/logout')