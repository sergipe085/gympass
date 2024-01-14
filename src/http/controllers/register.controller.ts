
import { FastifyRequest, FastifyReply } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

    const users_with_same_email = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (users_with_same_email) {
        return res.status(409).send()
    }

    const password_hash = await hash(password, 4);

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return res.status(201).send();
}