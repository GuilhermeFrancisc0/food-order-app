import { z } from 'zod';

export const categorySchema = z.object({
    id: z.string().optional(),
    name: z.string()
        .min(1, { message: "Campo Nome é Obrigatório" }),
    imageUrl: z.string()
        .min(1, { message: "Campo Imagem é Obrigatório" }),
})

export type Category = z.infer<typeof categorySchema>;