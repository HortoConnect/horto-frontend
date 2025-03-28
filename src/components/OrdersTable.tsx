import { useState } from "react";
import { fornecedores } from "@/types/fornecedores";
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
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";

export default function OrdersTable({ fornecedores }: fornecedores) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editableFields, setEditableFields] = useState({
    name: false,
    cnpj: false,
    sales_phone: false,
    contact_phone: false,
  });

  const handleRowClick = (id: number) => {
    setSelectedSupplierId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    // Lógica para excluir o fornecedor
    console.log("Excluir fornecedor:", selectedSupplierId);
    setIsDialogOpen(false);
  };

  const handleEdit = () => {
    // Lógica para editar o fornecedor
    console.log("Editar fornecedor:", selectedSupplierId);
    setIsDialogOpen(false);
  };

  const handleFieldEditToggle = (field: string) => {
    setEditableFields((prevState : any) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const selectedSupplier = fornecedores.find(f => f.id === selectedSupplierId);

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {fornecedores.map((fornecedor) => (
            <TableRow 
              key={fornecedor.id} 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleRowClick(fornecedor.id)}
            >
              <TableCell>{fornecedor.id}</TableCell>
              <TableCell>{fornecedor.name}</TableCell>
              <TableCell>{fornecedor.cnpj}</TableCell>
              <TableCell>{fornecedor.sales_phone}</TableCell>
              <TableCell>{fornecedor.contact_phone}</TableCell>
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

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {/* Nome */}
                  <div className="flex justify-between items-center">
                    <label className="font-medium">Nome</label>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFieldEditToggle("name")}
                      size="sm"
                    >
                      {editableFields.name ? "Salvar" : "Editar"}
                    </Button>
                  </div>
                  <div>
                    {editableFields.name ? (
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        defaultValue={selectedSupplier.name}
                      />
                    ) : (
                      <p>{selectedSupplier.name}</p>
                    )}
                  </div>

                  {/* CNPJ */}
                  <div className="flex justify-between items-center">
                    <label className="font-medium">CNPJ</label>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFieldEditToggle("cnpj")}
                      size="sm"
                    >
                      {editableFields.cnpj ? "Salvar" : "Editar"}
                    </Button>
                  </div>
                  <div>
                    {editableFields.cnpj ? (
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        defaultValue={selectedSupplier.cnpj}
                      />
                    ) : (
                      <p>{selectedSupplier.cnpj}</p>
                    )}
                  </div>

                  {/* Telefone de Venda */}
                  <div className="flex justify-between items-center">
                    <label className="font-medium">Telefone de Venda</label>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFieldEditToggle("sales_phone")}
                      size="sm"
                    >
                      {editableFields.sales_phone ? "Salvar" : "Editar"}
                    </Button>
                  </div>
                  <div>
                    {editableFields.sales_phone ? (
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        defaultValue={selectedSupplier.sales_phone}
                      />
                    ) : (
                      <p>{selectedSupplier.sales_phone}</p>
                    )}
                  </div>

                  {/* Telefone de Contato */}
                  <div className="flex justify-between items-center">
                    <label className="font-medium">Telefone de Contato</label>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFieldEditToggle("contact_phone")}
                      size="sm"
                    >
                      {editableFields.contact_phone ? "Salvar" : "Editar"}
                    </Button>
                  </div>
                  <div>
                    {editableFields.contact_phone ? (
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        defaultValue={selectedSupplier.contact_phone}
                      />
                    ) : (
                      <p>{selectedSupplier.contact_phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Fechar
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Excluir
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
