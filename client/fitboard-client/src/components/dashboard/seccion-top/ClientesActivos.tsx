import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useClients } from "../../../context/clientes-context/ClientesContext";


export const ClientesActivos = () => {
const { clientes } = useClients()


const clientAct = clientes?.filter( c => c.estado === "activo").length ?? 0;


    return (

<div className="flex items-center gap-4 !p-6 w-35 h-30 md:w-72 md:h-40 bg-gray-900  rounded-2xl shadow-xl hover:shadow-xl shadow-black transition-shadow duration-300">
  <div className="flex items-center justify-center w-80 h-10 md:w-16 md:h-16 bg-blue-600/20 rounded-full">
    <PeopleAltOutlinedIcon className="text-blue-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    <p className="md:text-3xl text-2xl font-bold text-white">{clientAct}</p>
    <h3 className="text-gray-400 text-xs md:text-sm">Clientes Activos</h3>
  </div>
</div>
    );
}