import { prisma } from "@/lib/prisma";
import { ICreateUserDTO } from "./dtos/users-dto";
import { hash } from "bcryptjs";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";

class _UserService {
    constructor(private usersRepository: UsersRepository) {}
    
    async createUser({ name, email, password }: ICreateUserDTO) {

        const users_with_same_email = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (users_with_same_email) {
            throw new Error("email already exists");
        }

        const password_hash = await hash(password, 4);

        await this.usersRepository.create({
            name, 
            email,
            password_hash
        })
    } 
}

export function UserService(usersRepository: UsersRepository) {
    return new _UserService(usersRepository);
}