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

export const getBookApi = async (payload: number) => {
    try {
        const res = await axiosInstances.get(`/book/getBook/${payload}`)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}
export const bookDetailApi = async (payload: string) => {
    try {
        const res = await axiosInstances.get(`book/bookDetails/${payload}`)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}

interface bookAvailablityPayload {
    name: string,
    currentAvailability: string
}

export const bookAvailablityApi = async (payload: bookAvailablityPayload) => {
    try {
        const res = await axiosInstances.patch(`/book/avilability`, payload)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}

interface issueBookPayload {
    bookName: string;
    user: string;
    transactionType: string;
}

export const issueBookApi = async (payload: issueBookPayload) => {
    try {
        const res = await axiosInstances.post(`/book/issue`, payload)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}
interface returnBookPayload {
    bookName: string;
    user: string;
    transactionType: string;
}

export const returnBookApi = async (payload: returnBookPayload) => {
    try {
        const res = await axiosInstances.post(`/book/return`, payload)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}

export const deleteBookApi = async (payload: string) => {
    try {
        const res = await axiosInstances.delete(`/book/delete/${payload}`)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}

export const searchBookApi = async (payload: string) => {
    try {
        const res = await axiosInstances.get(`/book/search/${payload}`)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}