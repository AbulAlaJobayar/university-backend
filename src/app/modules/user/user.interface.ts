import { User_role } from "./user.constant";

export type TUser ={
    username: string;
    email: string;
    password: string;
    role: User_role;
}