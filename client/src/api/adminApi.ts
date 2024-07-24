import { axiosInstances } from "./axiosInstace";

interface registerPayload {
    "username": string,
    "firstName": string,
    "lastName": string,
    "password": string,
    "email": string,
    "contactNumber": string
}

export const registerApi = async (payload: registerPayload) => {
    try {
        const res: any = await axiosInstances.post('/admin/register', payload);
        return res.data;
    } catch (error: any) {
        // console.log(error);
        return error.response.data;
    }
}

interface loginPayload {
    admin: string;
    password: string;
}
export const loginApi = async (payload: loginPayload) => {
    try {
        const res: any = await axiosInstances.post('/admin/login', payload);
        return res.data;
    } catch (error: any) {
        // console.log(error);
        return error.response.data;
    }
}

