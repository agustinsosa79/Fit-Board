import { fetchClientes } from "../../services/clientesService";
import type { Cliente } from "../../types/clientes";
import { useEffect, useState } from "react";    
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";


export const ClientesInactivos = () => {
    const [clientesInactivos, setClientesInactivos] = useState<Cliente[]>([])


    useEffect(() => {
        const getClientesInactivos = async () => {
            try {
                const data = await fetchClientes();
                const inactivos = data.filter(cliente => cliente.estado === "inactivo")
                setClientesInactivos(inactivos);
            } catch (error) {
                console.error("Error fetching inactive clients:", error);

            }
        }

        getClientesInactivos();
    }, [])

    return (

<div className="flex items-center gap-4 w-72 h-40 !p-6 bg-gray-900 rounded-2xl shadow-xl shadow-black hover:shadow-xl transition-shadow duration-300">
  <div className="flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full">
    <PersonOffOutlinedIcon className="text-red-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    <p className="text-3xl font-bold text-white">{clientesInactivos.length}</p>
    <h3 className="text-gray-400 text-sm">Clientes Inactivos</h3>
  </div>
</div>
    );

}