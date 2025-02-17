// import {IUserResponse} from "@/models/usersModels/IUserResponse";
// import {axiosInstance} from "@/services/serviceAuthLogin/api.auth.service";
// import {IRecipeResponse} from "@/models/resipeModels/IRecipeResponse";
//
// export const getData =  {
//     getUser: async (): Promise<IUserResponse> => {
//         const {data} = await axiosInstance.get<IUserResponse>('/users')
//         return data;
//     },
//     getUsersWithPagination: async (page: string): Promise<IUserResponse> => {
//         const limit = 30;
//         const skip = limit * (+page) - limit;
//         const {data} = await axiosInstance.get<IUserResponse>(`/users?skip=${skip}`)
//         return data;
//     },
//     getRecipeWithPagination: async (page: string): Promise<IRecipeResponse> => {
//         const limit = 30;
//         const skip = limit * (+page) - limit;
//         const {data} = await axiosInstance.get<IRecipeResponse>(`/recipes?skip=${skip}`)
//         return data;
//     },
//     getRecipeByUserId: async (userId: number): Promise<IRecipeResponse> => {
//         const { data } = await axiosInstance.get<IRecipeResponse>(`/recipes?userId=${userId}`);
//         return data;
//     },
// }
//
// src/services/userService/api.user.service.ts

// src/services/userService/api.user.service.ts

import { IUserResponse } from "@/models/usersModels/IUserResponse";
import { IRecipeResponse } from "@/models/resipeModels/IRecipeResponse";
import { axiosInstance } from "@/services/serviceAuthLogin/api.auth.service";
import {IUser} from "@/models/usersModels/IUser";

export const getData =  {
    getUser: async (): Promise<IUserResponse> => {
        const { data } = await axiosInstance.get<IUserResponse>(`/users`);
        return data;
    },
    getUsersWithPagination: async (page: string): Promise<IUserResponse> => {
        const limit = 30;
        const skip = limit * (+page) - limit;
        const { data } = await axiosInstance.get<IUserResponse>(`/users?skip=${skip}&limit=${limit}`);
        return data;
    },
    getRecipeByUserId: async (userId: number): Promise<IRecipeResponse> => {
        const { data } = await axiosInstance.get<IRecipeResponse>(`/recipes?userId=${userId}`);
        return data;
    },
    getRecipeWithPagination: async (page: string): Promise<IRecipeResponse> => {
        const limit = 30;
        const skip = limit * (+page) - limit;
        const { data } = await axiosInstance.get<IRecipeResponse>(`/recipes?skip=${skip}&limit=${limit}`);
        return data;
    },
    getUserById: async (id: number): Promise<IUser> => {
        const {data} = await axiosInstance.get<IUser>(`$user/${id}`)
        return data;
    },
};
