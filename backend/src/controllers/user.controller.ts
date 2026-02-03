import "dotenv/config";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { UserCreateSchema, UserLoginSchema } from "../zodSchemas/user.zodschema.js";
import { createUser, getUser } from "../services/user.service.js";
import { sign } from "hono/jwt"
import { setCookie } from "hono/cookie";
import { compare } from "bcrypt";
import { success } from "zod";

const user = new Hono();

user.post(
    "/create",
    zValidator("json", UserCreateSchema),
    async (c) => {
        try {
            const data = c.req.valid("json");
            const create = await createUser(data);
            return c.json({
                success: true,
                message: `Successfully create ${create.username}`,
                data: create,
            })
        }
        catch (err) {
            if (err instanceof Error) {
                return c.json({
                    success: false,
                    message: JSON.parse(err.message),
                })
            }
        }
    })
user.post(
    "login",
    zValidator("json", UserLoginSchema),
    async (c) => {
        try {
            const secret = process.env.JWT_SECRET;
            const data = c.req.valid('json');
            const get = await getUser(data)
            if (!get) {
                throw new Error("Username not found");
            }
            if (!await compare(data.password, get.password)) {
                throw new Error("Login Error : Password doesn't match")
            }
            const payload = {
                id: get.id,
                username: get.username,
                createdAt: get.createdAt,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
            }
            const token = await sign(payload, secret as string)
            setCookie(c, "token", token)
            return c.json({
                success: true,
                message: `Successfully login as ${get.username}`
            })
        }
        catch (err) {
            if (err instanceof Error) {
                return c.json({
                    success: false,
                    message: err.message
                })
            }
        }
    }
)

export { user }