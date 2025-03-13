import { fornecedores } from "@/types/fornecedores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useNavigate } from "react-router-dom";

export default function OrdersTable({ fornecedores }: fornecedores) {
  const navigate = useNavigate();

  const handleRowClick = (id : number) => {
    navigate(`/fornecedor/${id}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">ID</TableHead>
          <TableHead className="table-cell">Nome</TableHead>
          <TableHead className="table-cell">CNPJ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fornecedores.map((fornecedor) => (
          <TableRow 
            key={fornecedor.id} 
            className="cursor-pointer" 
            onClick={() => handleRowClick(fornecedor.id)}
          >
            <TableCell>{fornecedor.id}</TableCell>
            <TableCell>{fornecedor.name}</TableCell>
            <TableCell>{fornecedor.cnpj}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
