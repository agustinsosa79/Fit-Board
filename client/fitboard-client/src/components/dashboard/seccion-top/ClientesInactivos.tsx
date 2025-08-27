import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { useClients } from "../../../context/clientes-context/ClientesContext";


export const ClientesInactivos = () => {
  const { clientes } = useClients()

  const clientInact = clientes.filter(c => c.estado === 'inactivo').length ?? 0

  return (

<div className="flex items-center gap-4 w-72 h-40 !p-6 bg-gray-900 rounded-2xl shadow-xl shadow-black hover:shadow-xl transition-shadow duration-300">
  <div className="flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full">
    <PersonOffOutlinedIcon className="text-red-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    <p className="text-3xl font-bold text-white">{clientInact}</p>
    <h3 className="text-gray-400 text-sm">Clientes Inactivos</h3>
  </div>
</div>
    );

}