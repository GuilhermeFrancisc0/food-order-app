import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string()
        .min(1, { message: "Campo Email é Obrigatório" })
        .email("Email Inválido"),
    password: z.string()
        .min(1, { message: "Campo Senha é Obrigatório" }),
});

export type SignInForm = z.infer<typeof signInSchema>;