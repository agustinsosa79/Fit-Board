// ClientesTotales.tsx
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useClients } from "../../../context/clientescontext/ClientesContext";

interface ClientesTotalesProps {
  loading: boolean;
}

export const ClientesTotales = ({ loading }: ClientesTotalesProps) => {
  const {clientes} = useClients()
  if (loading) return <div>Cargando...</div>;


  

  return(

    
    <div className="flex items-center w-35 h-30 md:w-72 md:h-40 gap-4 !p-6 bg-gray-900 rounded-2xl shadow-xl shadow-black hover:shadow-xl transition-shadow duration-300">
  <div className="flex items-center justify-center w-30 h-10 md:w-16 md:h-16 bg-purple-600/20 rounded-full">
    <GroupOutlinedIcon className="text-purple-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    <p className="md:text-3xl text-2xl font-bold text-white">{clientes.length}</p>
    <h3 className="text-gray-400 text-xs md:text-sm">Total de Clientes</h3>
  </div>
</div>
);
};
