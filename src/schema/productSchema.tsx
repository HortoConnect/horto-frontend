import { z } from "zod"

const cadastroProductSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  imagem: z
    .instanceof(FileList)
    .refine(files => files.length >= 1, "Pelo menos uma foto é obrigatória")
});

const cadastroCategorySchema = z.object({
  categoria: z.string().min(1, "Categoria é obrigatório"),
});

const cadastroSubcategorySchema = z.object({
  subcategoria: z.string().min(1, "Subcategoria é obrigatório"),
})

const cadastroSize = z.object({
  tamanho: z.string().min(1, "Tamanho é obrigatório")
})

const cadastroQuality = z.object({
  qualidade: z.string().min(1, "Qualidade é obrigatório")
})

const prodByFornecedor = z.object({
  preco: z.string().min(1, "Preço é obrigatório"),
})

export const productSchema = cadastroProductSchema
export const categorySchema = cadastroCategorySchema;
export const subcategorySchema = cadastroSubcategorySchema;
export const sizeSchema = cadastroSize;
export const qualitySchema = cadastroQuality;
export const prodByFornecedorSchema = prodByFornecedor;

export type ProductFormValues = z.infer<typeof productSchema>;
export type CategoryFormValues = z.infer<typeof categorySchema>;
export type SubcategoryFormValues = z.infer<typeof subcategorySchema>;
export type SizeFormValues = z.infer<typeof sizeSchema>;
export type QualityFormValues = z.infer<typeof qualitySchema>;
export type ProdByFornecedorFormValues = z.infer<typeof prodByFornecedorSchema>;