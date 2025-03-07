import { LoginFormValues, loginSchema } from "./schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import logo from "../src/assets/img/logo.png";
import { Label } from "./components/ui/label";
import { useAuth } from "./hooks/useAuth";
import { buttonVariants } from "./components/ui/button";
import { cn } from "./lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const { login, error } = useAuth();
  const { role, isLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isLoggedIn && role) {
      console.log("Role in useEffect:", role);
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "CLIENT") {
        navigate("/produtos");
      }
    }
  }, [isLoggedIn, role, navigate]);

  async function onSubmit(data: FieldValues) {
    console.log(data.email, data.password);
    try {
      await login(data.email, data.password);
      reset({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-100 flex items-center justify-center p-4">
      <div className="flex w-full max-w-[1200px]">
        {/* Left Side (Logo and h1) */}
        <div className="flex-1 md:flex flex-col items-center justify-center hidden">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-[250px]" alt="Adota Logo" />
          </Link>
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-sm shadow-lg md:p-8 p-4 space-y-6">
            <div className="flex-1 flex flex-col items-center justify-center md:hidden">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={logo} className="h-32" alt="Adota Logo" />
              </Link>
              <div className="text-center mb-[10px] text-green-800">
                <h1 className="font-main font-bold md:text-3xl text-[25px]">
                  Olá, Boas-vindas!
                  <br />
                </h1>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div>
                  <Label htmlFor="email" className="text-black font-tertiary">
                    Email
                  </Label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="input mt-1 w-full"
                    {...register("email")}
                  />
                  <p className="text-xs font-semibold text-red-700 mt-1">
                    <ErrorMessage errors={errors} name="email" />
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-black font-tertiary"
                  >
                    Senha
                  </Label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Senha"
                    className="input mt-1 w-full"
                    {...register("password")}
                  />
                  <p className="text-xs font-semibold text-red-700 mt-1">
                    <ErrorMessage errors={errors} name="password" />
                  </p>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
                  {error}
                </div>
              )}

              <button
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-green-600 py-[25px] text-base hover:bg-green-700 w-full text-white cursor-pointer mt-2 font-main"
                )}
                disabled={isSubmitting}
              >
                Acessar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;