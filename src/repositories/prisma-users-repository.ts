import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client";
import { UsersRepository } from "./users-repository";

export class PrismaUsersRepository extends UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user;
    }
}