import { Form, Input, Button } from "@heroui/react";
import { useState, useRef } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        {/* Logo / Imagen */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.png" // O import desde assets
            alt="Logo"
            className="h-20 w-20 object-contain"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
          Iniciar Sesión
        </h2>

        {/* Formulario de Login */}
        <Form onSubmit={onSubmit} className="space-y-4">
          <Input
            isRequired
            errorMessage="Ingrese un email válido"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="correo@ejemplo.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            isRequired
            errorMessage="Ingrese una contraseña válida"
            label="Contraseña"
            labelPlacement="outside"
            name="password"
            placeholder="********"  
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
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
    color="success"
    isLoading={loading}
    className="w-full flex justify-center font-bold text-amber-50"
    radius="full"
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
