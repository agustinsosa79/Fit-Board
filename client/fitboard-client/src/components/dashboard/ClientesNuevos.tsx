import { useEffect, useState } from "react";
import type { Cliente } from "../../types/clientes";
import { fetchClientes } from "../../services/clientesService";
import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import dayjs from "dayjs";

export const ClientesNuevos = ({ loading }: { loading: boolean }) => {
    const [nuevosClientes, setNuevosClientes] = useState<Cliente[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClientes();
                if(data) {
                    const mesActual = dayjs().month()
                    const añoActual = dayjs().year()

                    const filtrados = data.filter(cliente => {
                        const fechaCreacion = dayjs(cliente.creado_en);
                        return fechaCreacion.month() === mesActual && fechaCreacion.year() === añoActual;
                    });

                    setNuevosClientes(filtrados)
                }
            } catch (error) {
                console.error('Error fetching clientes:', error);
            }
        };
        fetchData();
    }, []);


    return (
            <div className="flex w-71 h-40 !items-center !gap-4 !p-6 bg-gray-900 rounded-2xl shadow-xl shadow-black hover:shadow-xl transition-shadow duration-300">
  <div className="flex !items-center !justify-center !w-16 !h-16 bg-green-600/20 rounded-full">
    <InsertChartOutlinedSharpIcon className="text-green-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    {loading ? (
      <p className="text-gray-400 text-sm">Cargando...</p>
    ) : (
      <p className="text-3xl font-bold text-white">{nuevosClientes.length}</p>
    )}
    <h3 className="text-gray-400 text-sm">Clientes nuevos este mes</h3>
  </div>
</div>

    );
};
