import {ICoordinates} from "@/models/usersModels/ICoordinates";

export interface IAddressCompany {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: ICoordinates;
    country: string;
}