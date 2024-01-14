
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserService } from "@/services/users-service";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function register(req: FastifyRequest, res: FastifyReply) {
    const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
    })

    const {
        name,
        email,
        password
    } = createUserBodySchema.parse(req.body);

    try {
        const usersRepository = new PrismaUsersRepository();

        await UserService(usersRepository).createUser({
            name,
            email,
            password
        })
    }
    catch(err) {
        if (err instanceof UserAlreadyExistsError) {
            return res.status(409).send(err);
        }

        return res.status(500).send(err);
    }

    return res.status(201).send();
}