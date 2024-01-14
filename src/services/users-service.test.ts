import { TempUsersRepository } from "@/repositories/temp/temp-users-repository";
import { describe, it, expect } from "vitest";
import { UserService } from "./users-service";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Users Service Tests", () => {
    it("should register", async () => {
        const usersRepository = new TempUsersRepository();
        const usersService = UserService(usersRepository);

        const { user } = await usersService.createUser({
            name: "sergio filho",
            email: "marina@gmail.com",
            password: "123456"
        })
        
        expect(user.id).toEqual(expect.any(String));
    });

    it("should hash user password upon registration", async () => {
        const usersRepository = new TempUsersRepository();
        const usersService = UserService(usersRepository);

        const { user } = await usersService.createUser({
            name: "sergio filho",
            email: "marina@gmail.com",
            password: "123456"
        })

        const passwordHashMatch = await compare("123456", user.password_hash)
        
        expect(passwordHashMatch).toBe(true);
    });

    it("should not be possible to create a user with a duplicated email", async () => {
        const usersRepository = new TempUsersRepository();
        const usersService = UserService(usersRepository);

        var { user } = await usersService.createUser({
            name: "sergio filho",
            email: "marina@gmail.com",
            password: "123456"
        })

        await expect(() => usersService.createUser({
            name: "marina filho",
            email: "marina@gmail.com",
            password: "1234"
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })
})