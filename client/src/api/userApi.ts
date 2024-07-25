import { axiosInstances } from "./axiosInstace"
interface userPayload {
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "contactNumber": string
}

export const createUserApi = async (payload: userPayload) => {
    try {
        const res = await axiosInstances.post('user/register', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}