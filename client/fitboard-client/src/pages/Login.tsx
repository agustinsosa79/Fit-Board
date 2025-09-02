import { Form, Input, Button } from "@heroui/react";
import { useState, useRef } from "react";
import { useAuth } from "../context/clientescontext/useAuth";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import  logo  from "../assets/logo-fit.png"; // Asegúrate de que la ruta sea correcta

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const errorTimeoutRef = useRef<number | null>(null);

  const showError = () => {
    setError(true);
    // Limpia cualquier timeout anterior
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(false), 3000);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await login(email, password);
      navigate("/"); // redirige al dashboard
      setError(false);
    } catch (err) {
      console.error(err);
      showError();
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-8 bg-gradient-to-tl from-[#0e012b] via-[#441cac] to-[#2b40c4]">
  <div className=" p-20 bg-white rounded-xl shadow-md w-140 h-150"  style={{ padding: "2rem"}}>
        {/* Logo / Imagen */}
        <div className="flex gap-px flex-col items-center mb-8">
  <img
    src={logo}
    alt="Logo"
    className="h-50 w-50 object-contain bg-black rounded-full shadow-neutral-900"
  />
  <h2 className="text-center text-2xl font-bold text-gray-700 mt-4">
    Iniciar Sesión
  </h2>
</div>

        {/* Formulario de Login */}
        <Form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col gap-10 w-full" style={{ marginTop: "5rem" }}>
          <Input
            isRequired
            errorMessage="Ingrese un email válido"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="correo@ejemplo.com"
            type="email"
            variant="faded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="md"
            radius="md"
            />
          <Input
            isRequired
            errorMessage="Ingrese una contraseña válida"
            label="Contraseña"
            labelPlacement="outside"
            name="password"
            placeholder="********"  
            type="password"
            variant="faded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="md"
            radius="md"
            />
            </div>
          <div className="flex flex-col items-center w-full">

  <div className="h-6 mb-2 w-full flex justify-center">
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          key="error-message"
          className="text-red-500 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          Correo o contraseña incorrectos
        </motion.p>
      )}
    </AnimatePresence>
  </div>

  <Button
    type="submit"
    isLoading={loading}
    className="w-full flex justify-center font-bold text-amber-50 bg-gradient-to-r from-[#010b42] via-[#3c06cf] to-[#8403da]"
    radius="lg"
    variant="shadow"
    size="md"
  >
    Ingresar
  </Button>
  </div>
        </Form> 
      </div>
    </div>
  );
};
