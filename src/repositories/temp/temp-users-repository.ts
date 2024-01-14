import { prisma } from "@/lib/prisma"
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class TempUsersRepository extends UsersRepository {
    private data: User[] = [];

    async create({name, email, password_hash}: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            name,
            email,
            password_hash,
            created_at: new Date()
        };

        this.data.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.data.find(d => d.email === email);
        return user ?? null;
    }
}