import {z} from "zod"

const cadastroFornecedor = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    cnpj: z.string().length(18, "O CNPJ precisa ser válido"),
    telefone: z.string().min(1, "O telefone de contato é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: "Telefone inválido. Use o formato (00) 00000-0000"
    }),
    telefoneVenda: z.string().min(1, "O telefone de venda é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: "Telefone inválido. Use o formato (00) 00000-0000"
    })
})

export const cadastroFornecedorSchema = cadastroFornecedor;
export type CadastroFornecedor = z.infer<typeof cadastroFornecedor>