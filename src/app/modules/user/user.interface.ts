import { User_role } from "./user.constant";

export type TUser ={
    username: string;
    email: string;
    password: string;
    passwordChangedAt?:Date;
    role: User_role;
    passwordHistory?:{password:string; timeStamp:Date}[];
}