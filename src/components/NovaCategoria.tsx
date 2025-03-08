import { CategoryFormValues, categorySchema } from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useProdutos } from "@/hooks/useProdutos";
import { useQueryClient } from "@tanstack/react-query";

const NovaCategoria = () => {
  const { error, cadastroCategoria } = useProdutos();
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categorySchema) });

  async function onSubmit(data: FieldValues) {
    try {
      const categoria = data.categoria.toLowerCase();
      await cadastroCategoria(categoria);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Categoria cadastrada com sucesso!");
      reset({
        categoria: "",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar categoria");
      console.error("Erro ao cadastrar categoria:", error);
    }
  }
  return (
    <div className="container flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <h1 className="font-main text-2xl font-bold text-gray-800">
          Informe o nome da categoria que deseja criar:
        </h1>
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Categoria
            </label>
            <input
              type="text"
              id="categoria"
              {...register("categoria")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="categoria" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button className=" bg-green-600" disabled={isSubmitting}>
              <span>Criar categoria</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaCategoria;
