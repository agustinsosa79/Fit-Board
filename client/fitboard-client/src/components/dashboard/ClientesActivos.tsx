import { fetchClientes } from "../../services/clientesService";
import type { Cliente } from "../../types/clientes";
import { useEffect, useState } from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";


export const ClientesActivos = () => {
const [clientesActivos, setClientesActivos] = useState<Cliente[]>([])


    useEffect(() => {
        const getClientesActivos = async () => {
            try {
                const data = await fetchClientes();
                const activos = data.filter(cliente => cliente.estado === "activo")
                setClientesActivos(activos);
            } catch (error) {
                console.error("Error fetching active clients:", error);
                
            }
        }

        getClientesActivos();
    }, [])

    return (

<div className="flex items-center gap-4 !p-6 w-72 h-40 bg-gray-900 rounded-2xl shadow-xl hover:shadow-xl shadow-black transition-shadow duration-300">
  <div className="flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full">
    <PeopleAltOutlinedIcon className="text-blue-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    <p className="text-3xl font-bold text-white">{clientesActivos.length}</p>
    <h3 className="text-gray-400 text-sm">Clientes Activos</h3>
  </div>
</div>

    );

}