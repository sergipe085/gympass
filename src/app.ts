import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.post("/users", async (req, res) => {
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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password
        }
    })

    return res.status(201).send();
})