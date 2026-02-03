import { prisma } from "../utils/prisma.js"
import type { UserCreateDTO, UserLoginDTO } from "../zodSchemas/user.zodschema.js";
import { hash } from "bcrypt";

async function createUser(data: UserCreateDTO) {
    try {
        const create = await prisma.user.create({
            data: {
                username: data.username,
                password: await hash(data.password, 10)
            }
        })
        return {
            id: create.id,
            username: create.username,
            createdAt: create.createdAt,
            updatedAt: create.updatedAt
        }
    }
    catch (err) {
        throw err
    }
}

async function getUser(data: UserLoginDTO) {
    try {
        const get = await prisma.user.findFirst({
            where: {
                username: data.username
            }
        })

        return get;
    }
    catch (err) {
        throw err
    }
}
export { createUser, getUser }