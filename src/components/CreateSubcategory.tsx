import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  cadastroSubcategoriaService,
  fetchTamanhos,
  fetchQualidade,
} from "../services/produtosService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const subcategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

type FormValues = z.infer<typeof subcategorySchema>;

interface Props {
  currentCategoryId?: string;
}

export function CreateSubcategoryModal({ currentCategoryId }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(subcategorySchema),
  });

  const { data: tamanhos = [] } = useQuery({
    queryKey: ["tamanhos"],
    queryFn: fetchTamanhos,
    staleTime: 20 * 60 * 1000,
  });

  const { data: qualidades = [] } = useQuery({
    queryKey: ["qualidades"],
    queryFn: fetchQualidade,
    staleTime: 20 * 60 * 1000,
  });

  const toggleSelection = (
    id: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const SelectedPill = ({
    name,
    onRemove,
  }: {
    id: string;
    name: string;
    onRemove: () => void;
  }) => (
    <div className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mr-2 mb-2">
      <span>{name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 text-green-600 hover:text-green-800 focus:outline-none"
      >
        ×
      </button>
    </div>
  );

  const onSubmit = async (data: FormValues) => {
    if (!currentCategoryId) {
      toast.error("Selecione uma categoria primeiro");
      return;
    }

    try {
      const name = data.name.toLowerCase();
      await cadastroSubcategoriaService(
        name,
        Number(currentCategoryId),
        selectedQualities.map((id) => Number(id)),
        selectedSizes.map((id) => Number(id))
      );

      await queryClient.invalidateQueries({
        queryKey: ["subcategories", Number(currentCategoryId)],
      });
      toast.success("Subcategoria criada com sucesso!");
      reset();
      setSelectedSizes([]);
      setSelectedQualities([]);
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar subcategoria");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="whitespace-nowrap"
          disabled={!currentCategoryId}
        >
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Subcategoria</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Nome da subcategoria"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="name" />
            </p>
          </div>

          {/* Seção de Qualidades */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Qualidades
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {selectedQualities.map((id) => {
                const quality = qualidades.find((q: any) => q.id === id);
                return (
                  <SelectedPill
                    key={id}
                    id={id}
                    name={quality?.name || ""}
                    onRemove={() => toggleSelection(id, setSelectedQualities)}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {qualidades.map((qualidade: any) => (
                <button
                  type="button"
                  key={qualidade.id}
                  onClick={() => toggleSelection(qualidade.id, setSelectedQualities)}
                  className={`p-2 text-sm rounded-md transition-colors
                    ${
                      selectedQualities.includes(qualidade.id)
                        ? "bg-green-500 text-white ring-2 ring-green-600"
                        : "bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-300"
                    }`}
                >
                  {qualidade.name}
                </button>
              ))}
            </div>
          </div>

          {/* Seção de Tamanhos */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tamanhos
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSizes.map((id) => {
                const size = tamanhos.find((t: any) => t.id === id);
                return (
                  <SelectedPill
                    key={id}
                    id={id}
                    name={size?.name || ""}
                    onRemove={() => toggleSelection(id, setSelectedSizes)}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {tamanhos.map((tamanho: any) => (
                <button
                  type="button"
                  key={tamanho.id}
                  onClick={() => toggleSelection(tamanho.id, setSelectedSizes)}
                  className={`p-2 text-sm rounded-md transition-colors
                    ${
                      selectedSizes.includes(tamanho.id)
                        ? "bg-blue-500 text-white ring-2 ring-blue-600"
                        : "bg-gray-100 hover:bg-gray-200 ring-1 ring-gray-300"
                    }`}
                >
                  {tamanho.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
