import * as z from "zod"
const Username = z.string().min(3);
const Password = z.string().min(8);
const Timestamp = z.coerce.date();

const UserCredentialsSchema = z.object({
    username: Username,
    password: Password
})

const UserSchema = UserCredentialsSchema.omit({ password: true }).extend({
    id: z.string(),
    createdAt: Timestamp,
    updatedAt: Timestamp.optional()
})
const UserCreateSchema = UserCredentialsSchema
const UserLoginSchema = UserCredentialsSchema

export { UserSchema, UserCreateSchema, UserLoginSchema };

export type User = z.infer<typeof UserSchema>
export type UserCreateDTO = z.infer<typeof UserCreateSchema>
export type UserLoginDTO = z.infer<typeof UserLoginSchema>