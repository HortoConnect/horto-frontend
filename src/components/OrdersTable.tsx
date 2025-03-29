import { useState, useEffect } from "react";
import {
  CadastroFornecedor,
  cadastroFornecedorSchema,
} from "@/schema/fornecedorSchema";
import { fornecedores } from "@/types/fornecedores";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { UserPen } from "lucide-react";
import { useFornecedores } from "@/hooks/useFornecedor";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { InputMask } from "@react-input/mask";

export default function OrdersTable({ fornecedores }: fornecedores) {
  const { deleteFornecedor, updateFornecedor } = useFornecedores();
  const queryClient = useQueryClient();
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CadastroFornecedor>({
    resolver: zodResolver(cadastroFornecedorSchema),
  });

  const selectedSupplier = fornecedores.find(
    (f) => f.id === selectedSupplierId
  );

  useEffect(() => {
    if (selectedSupplier) {
      reset();
      setValue("nome", selectedSupplier.name);
      setValue("cnpj", selectedSupplier.cnpj);
      setValue("telefoneVenda", selectedSupplier.sales_phone);
      setValue("telefone", selectedSupplier.contact_phone);
    }
  }, [selectedSupplier, reset, setValue]);

  const handleRowClick = (id: number) => {
    setSelectedSupplierId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFornecedor(selectedSupplierId!);
      queryClient.invalidateQueries({
        queryKey: ["fornecedores"],
      });
      toast.success("Fornecedor excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir fornecedor.");
    }
    setIsDialogOpen(false);
  };

  async function onSubmit(data: any) {
    if (!selectedSupplierId) return;

    const updatedData: { [key: string]: any } = {};

    if (data.nome && data.nome !== selectedSupplier?.name) {
      updatedData.name = data.nome;
    }
    if (data.cnpj && data.cnpj !== selectedSupplier?.cnpj) {
      updatedData.cnpj = data.cnpj;
    }
    if (
      data.telefoneVenda &&
      data.telefoneVenda !== selectedSupplier?.sales_phone
    ) {
      updatedData.sales_phone = data.telefoneVenda;
    }
    if (data.telefone && data.telefone !== selectedSupplier?.contact_phone) {
      updatedData.contact_phone = data.telefone;
    }

    if (Object.keys(updatedData).length === 0) {
      toast.info("Nenhuma alteração detectada.");
      return;
    }
    try {
      await updateFornecedor(selectedSupplierId, updatedData);
      queryClient.invalidateQueries({
        queryKey: ["fornecedores"],
      });
      toast.success("Fornecedor atualizado com sucesso!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar fornecedor.");
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Telefone de Venda</TableHead>
            <TableHead>Telefone de Contato</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fornecedores.map((fornecedor) => (
            <TableRow
              key={fornecedor.id}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{fornecedor.id}</TableCell>
              <TableCell>{fornecedor.name}</TableCell>
              <TableCell>{fornecedor.cnpj}</TableCell>
              <TableCell>{fornecedor.sales_phone}</TableCell>
              <TableCell>{fornecedor.contact_phone}</TableCell>
              <TableCell onClick={() => handleRowClick(fornecedor.id)}>
                <UserPen />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedSupplier && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Fornecedor</DialogTitle>
                <DialogDescription>
                  Informações completas do fornecedor selecionado
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3">
                  {/* Nome */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-medium">Nome</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        {...register("nome")}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                      <p className="text-xs font-semibold text-red-700 mt-1">
                        <ErrorMessage errors={errors} name="nome" />
                      </p>
                    </div>
                  </div>

                  {/* CNPJ */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-medium">CNPJ</label>
                    </div>
                    <div>
                      <InputMask
                        type="text"
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
                  </div>

                  {/* Telefone de Venda */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-medium">Telefone de Venda</label>
                    </div>
                    <div>
                      <InputMask
                        mask="(__) _____-____"
                        replacement={{ _: /\d/ }}
                        {...register("telefoneVenda")}
                        placeholder="(00) 00000-0000"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                      <p className="text-xs font-semibold text-red-700 mt-1">
                        <ErrorMessage errors={errors} name="telefoneVenda" />
                      </p>
                    </div>
                  </div>

                  {/* Telefone de Contato */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-medium">Telefone de Contato</label>
                    </div>
                    <div>
                      <InputMask
                        mask="(__) _____-____"
                        replacement={{ _: /\d/ }}
                        {...register("telefone")}
                        placeholder="(00) 00000-0000"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      />
                      <p className="text-xs font-semibold text-red-700 mt-1">
                        <ErrorMessage errors={errors} name="telefone" />
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter className="space-x-2">
                
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDelete}
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  Excluir
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  Salvar mudanças
                </Button>
              </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}