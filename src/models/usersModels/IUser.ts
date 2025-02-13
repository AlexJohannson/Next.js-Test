import {IHair} from "@/models/usersModels/IHair";
import {IAddressHome} from "@/models/usersModels/IAddressHome";
import {IBank} from "@/models/usersModels/IBank";
import {ICompany} from "@/models/usersModels/ICompany";
import {ICrypto} from "@/models/usersModels/ICrypto";


export interface  IUser{
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: IHair;
  ip: string;
  address: IAddressHome;
  macAddress: string;
  university: string;
  bank: IBank;
  company: ICompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: ICrypto;
  role: string;
}