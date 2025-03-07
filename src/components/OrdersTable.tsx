import { fornecedores } from "@/types/fornecedores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";

export default function OrdersTable({fornecedores} :  fornecedores) {

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
          <TableRow key={fornecedor.id}>
            <TableCell>
              <Link to={`/fornecedor/${fornecedor.id}`} className="block">
                <div className="font-medium">{fornecedor.id}</div>
                <div className="font-medium">{fornecedor.nome}</div>
                <div className="font-medium">{fornecedor.cnpj}</div>
              </Link>
            </TableCell>
            <TableCell>{fornecedor.cnpj}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
