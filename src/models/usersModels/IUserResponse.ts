import {IUser} from "@/models/usersModels/IUser";

export interface IUserResponse {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}