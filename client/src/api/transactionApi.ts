import { axiosInstances } from "./axiosInstace";

export const historyApi = async (payload: string) => {
    try {
        const res = await axiosInstances.get(`/transaction/userTransaction/${payload}`,)
        return res.data
    } catch (error: any) {
        return error.response.data;
    }
}