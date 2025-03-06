import { z } from "zod";

const baseAuthSchema = z.object({
  email: z
    .string()
    .email("O e-mail precisa ser válido")
    .min(1, "O e-mail é obrigatório"),
  password: z
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres")
    .min(1, "A senha é obrigatória"),
});

export const loginSchema = baseAuthSchema;

export type LoginFormValues = z.infer<typeof loginSchema>;
