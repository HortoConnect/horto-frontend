import {z} from "zod"

const cadastroFornecedor = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    cnpj: z.string().length(18, "O CNPJ precisa ser válido"),
})

export const cadastroFornecedorSchema = cadastroFornecedor;
export type CadastroFornecedor = z.infer<typeof cadastroFornecedor>