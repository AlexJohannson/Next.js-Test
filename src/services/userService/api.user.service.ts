import {IUserResponse} from "@/models/usersModels/IUserResponse";
import {axiosInstance} from "@/services/serviceAuth/api.token.service";
import {IUser} from "@/models/usersModels/IUser";
import {baseUrl} from "@/services/api.service";

export const getData =  {
    getUser: async (): Promise<IUserResponse> => {
        const {data} = await axiosInstance.get<IUserResponse>('/users')
        return data
    },
    getUserById: async (id: number): Promise<IUser> => {
        const {data} = await axiosInstance.get<IUser>(`${baseUrl}/users/${id}`)
        return data;
    },
    getUsersWithPagination: async (skip: number, limit: number): Promise<IUserResponse> => {
        const {data} = await axiosInstance.get<IUserResponse>(`${baseUrl}?skip=${skip}&limit=${limit}`)
        return data;
    },
}