import { prisma } from "@/lib/prisma";
import { ICreateUserDTO } from "./dtos/users-dto";
import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

class _UserService {
    constructor(private usersRepository: UsersRepository) {}
    
    async createUser({ name, email, password }: ICreateUserDTO) {

        const user_with_same_email = await this.usersRepository.findByEmail(email);

        if (user_with_same_email) {
            throw new UserAlreadyExistsError;
        }

        const password_hash = await hash(password, 4);

        const user = await this.usersRepository.create({
            name, 
            email,
            password_hash
        })

        return {
            user
        }
    } 
}

export function UserService(usersRepository: UsersRepository) {
    return new _UserService(usersRepository);
}