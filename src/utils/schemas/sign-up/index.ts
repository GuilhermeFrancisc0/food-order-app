import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string()
        .min(1, { message: "Campo Email é Obrigatório" })
        .email("Email Inválido"),
    password: z.string()
        .min(1, { message: "Campo Senha é Obrigatório" }),
    confirmPassword: z.string()
        .min(1, { message: "Campo Confirmar senha é Obrigatório" }),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

export type SignUpForm = z.infer<typeof signUpSchema>;