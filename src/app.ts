import fastify from "fastify";
import { ZodError, z } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register.controller";
import { appRoutes } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((err, req, res) => {
    if (err instanceof ZodError) {
        return res.status(400).send({
            message: "Validation error.", issues: err.format()
        })
    }

    if (env.NODE_ENV != "production") {
        console.error(err);
    } else {
        // log to an external log service or a log file
    }

    return res.status(500).send({
        message: "Internal server error."
    })
})