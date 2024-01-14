import { User } from "@prisma/client";

export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserDTOResponse {
    user: User;
}