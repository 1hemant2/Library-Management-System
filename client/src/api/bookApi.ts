import { axiosInstances } from "./axiosInstace";

interface addBookPayload {
    "name": string
    "author": string,
    "currentAvailability": string
}

export const addBookApi = async (payload: addBookPayload) => {
    try {
        const res = await axiosInstances.post('/book/addBook', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}