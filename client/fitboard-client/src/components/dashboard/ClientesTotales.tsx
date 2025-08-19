// ClientesTotales.tsx
import { type Cliente } from "../../types/clientes";

interface ClientesTotalesProps {
  clientes: Cliente[];
  loading: boolean;
}

export const ClientesTotales = ({ clientes, loading }: ClientesTotalesProps) => {
  if (loading) return <div>Cargando...</div>;

  return <div>
    <h2>Total de Clientes: {clientes.length}</h2>
  </div>;
};
