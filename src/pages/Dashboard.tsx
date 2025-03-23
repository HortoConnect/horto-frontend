import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "@/components/ui/input";
import logo from "../assets/img/logo.png";
import { Search } from "lucide-react";
import OrdersTable from "@/components/OrdersTable";
import { fornecedoresListService } from "@/services/adminService";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/global/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import NovoProduto from "@/components/NovoProduto";
import NovoFornecedor from "@/components/NovoFornecedor";
import ProdFornecedores from "@/components/ProdFornecedores";

const Dashboard = () => {
  const {
    data: fornecedores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fornecedores"],
    queryFn: () => fornecedoresListService(),
    staleTime: 20 * 60 * 1000,
  });

  return (
    <div className="mx-auto px-4 mt-10 max-w-[1800px]">
      <Navbar />
      <Tabs defaultValue="fornecedores">
        <TabsList className="grid w-full lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:mb-4 mb-5">
          <TabsTrigger value="fornecedores">Fornecedores</TabsTrigger>
          <TabsTrigger value="produto">Criar produto</TabsTrigger>
          <TabsTrigger value="criarFornecedor">Criar fornecedor</TabsTrigger>
          <TabsTrigger value="prodFornecedores">Prod. fornecedores</TabsTrigger>
        </TabsList>

        <TabsContent value="fornecedores">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>
                <img src={logo} alt="Logo" className="w-[100px] h-auto" />
              </CardTitle>
              <CardDescription>Listagem de fornecedores</CardDescription>
              <div className="flex pt-10 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Busque por nome..."
                    className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px] py-5"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[400px] w-full rounded-lg shadow-sm" />
              ) : (
                <>
                  {error && <p>Erro ao carregar os fornecedores.</p>}
                  <OrdersTable fornecedores={fornecedores} />
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="produto">
          <NovoProduto />
        </TabsContent>
        <TabsContent value="criarFornecedor">
          <NovoFornecedor />
        </TabsContent>
        <TabsContent value="prodFornecedores">
         <ProdFornecedores/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
