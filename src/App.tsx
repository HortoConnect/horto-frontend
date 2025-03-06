import { LoginFormValues, loginSchema } from "./schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import logo from "../src/assets/img/logo.png";
import { Label } from "./components/ui/label";
import { useAuth } from "./hooks/useAuth";
import { buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import { Link } from "react-router-dom";

const App = () => {
  const { login, error } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: FieldValues) {
    console.log("Dados do formulário:", data);
    reset({
      email: "",
      password: "",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <form
        className="bg-white rounded-md shadow-lg p-8 w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center justify-center">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-28" alt="Adota Logo" />
          </Link>
          <div className="text-center mb-[30px] text-green-800 w-full">
            <h1 className="font-main font-bold md:text-3xl text-[25px]">
              Olá, Boas-vindas!
              <br />
            </h1>
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-black font-tertiary">
            Email
          </Label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="input mt-1"
            {...register("email")}
          />
          <p className="text-xs font-semibold text-red-700 mt-1">
            <ErrorMessage errors={errors} name="email" />
          </p>
        </div>
        <div>
          <Label htmlFor="password" className="text-black font-tertiary">
            Senha
          </Label>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            className="input mt-1"
            {...register("password")}
          />
          <p className="text-xs font-semibold text-red-700 mt-1">
            <ErrorMessage errors={errors} name="password" />
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
            {error}
          </div>
        )}
        <button
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-green-600 py-[25px] text-base hover:bg-green-700 w-full text-white cursor-pointer"
          )}
          disabled={isSubmitting}
        >
          Acessar
        </button>
      </form>
    </div>
  );
};

export default App;
