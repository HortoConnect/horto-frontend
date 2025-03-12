import {
  CadastroFornecedor,
  cadastroFornecedorSchema,
} from "@/schema/fornecedorSchema";
import { InputMask } from "@react-input/mask";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFornecedores } from "@/hooks/useFornecedor";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";

const NovoFornecedor = () => {
    const queryClient = useQueryClient()
  const { error, cadastroFornecedor } = useFornecedores();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CadastroFornecedor>({
    resolver: zodResolver(cadastroFornecedorSchema),
  });

  async function onSubmit(data: FieldValues) {
    try {
      await cadastroFornecedor(data.nome, data.cnpj);
      queryClient.invalidateQueries({
        queryKey: ["fornecedores"],
      });
      toast.success("Fornecedor cadastrado com sucesso!");
      reset({
        nome: "",
        cnpj: "",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar fornecedor");
      console.error("Erro ao cadastrar fornecedor:", error);
    }
  }

  return (
    <div className="w-full flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <h1 className="font-main text-2xl font-bold text-gray-800">
          Informe os dados para criar um novo fornecedor:
        </h1>
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do fornecedor
            </label>
            <input
              type="text"
              id="nome"
              {...register("nome")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="nome" />
            </p>
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
              CNPJ
            </label>
            <InputMask
              mask="__.___.___/____-__"
              replacement={{ _: /\d/ }}
              {...register("cnpj")}
              placeholder="00.000.000/0000-00"
               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
             <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="cnpj" />
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button className=" bg-green-600" disabled={isSubmitting}>
              <span>Criar fornecedor</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoFornecedor;
