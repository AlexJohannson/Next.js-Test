import {IAddressCompany} from "@/models/usersModels/IAddressCompany";


export interface ICompany {
    department: string;
    name: string;
    title: string;
    address: IAddressCompany;
}