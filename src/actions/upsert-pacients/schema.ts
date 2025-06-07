import { z } from "zod";

export const upsertPatientSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    email: z
      .string()
      .min(1, { message: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    phoneNumber: z.string().min(1, { message: "Telefone é obrigatório" }),
    sex: z.enum(["male", "female"], { message: "Sexo é obrigatório" })
})
