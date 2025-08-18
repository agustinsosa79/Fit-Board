// Clientes.tsx
import { useEffect, useState } from "react";
import { type Cliente } from "../types/clientes";
import { fetchClientes } from "../services/clientesService";
import { ClientForm } from '../components/clientes/Form/ClientForm';
import { ClientesTotales } from "../components/clientes/ClientesTotales";

export const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const handleClienteCreado = (cliente: Cliente) => {
    setClientes(prev => [...prev, cliente]);
  };

  useEffect(() => {
    const getClientes = async () => {
      try {
        const data = await fetchClientes();
        setClientes(data);
        console.log(data);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getClientes();
  }, []);
  

  return (
    <div className="p-50 bg-amber-200 w-full">
      <ClientForm onClienteCreado={handleClienteCreado} />
      <h1>Clientes</h1>
      <ClientesTotales clientes={clientes} loading={loading} />
    </div>
  );
};
