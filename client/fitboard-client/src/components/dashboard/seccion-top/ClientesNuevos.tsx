import InsertChartOutlinedSharpIcon from '@mui/icons-material/InsertChartOutlinedSharp';
import dayjs from "dayjs";
import { useClients } from "../../../context/clientes-context/ClientesContext";

export const ClientesNuevos = ({ loading }: { loading: boolean }) => {

  const { clientes } = useClients()
    
                    const mesActual = dayjs().month()
                    const añoActual = dayjs().year()

                    const filtrados = clientes.filter(cliente => {
                        const fechaCreacion = dayjs(cliente.creado_en);
                        return fechaCreacion.month() === mesActual && fechaCreacion.year() === añoActual;
                    }).length ?? 0;

                

    return (
            <div className="flex w-71 h-40 !items-center !gap-4 !p-6 bg-gray-900 rounded-2xl shadow-xl shadow-black hover:shadow-xl transition-shadow duration-300">
  <div className="flex !items-center !justify-center !w-16 !h-16 bg-green-600/20 rounded-full">
    <InsertChartOutlinedSharpIcon className="text-green-500 w-8 h-8" />
  </div>
  <div className="flex flex-col">
    {loading ? (
      <p className="text-gray-400 text-sm">Cargando...</p>
    ) : (
      <p className="text-3xl font-bold text-white">{filtrados}</p>
    )}
    <h3 className="text-gray-400 text-sm">Clientes nuevos este mes</h3>
  </div>
</div>

    );
};
