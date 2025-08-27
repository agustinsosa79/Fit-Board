import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useClients } from "../../../context/clientes-context/ClientesContext";
import dayjs from "dayjs";
import { useAuth } from "../../../context/clientes-context/useAuth";
import { useEffect } from "react";
import type { Cliente } from "../../../types/clientes";
import { fetchClientes } from "../../../services/clientesService";

// registrar módulos
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
ChartJS.defaults.font.family = "Roboto, sans-serif"
ChartJS.defaults.font.weight = "normal"
ChartJS.defaults.font.size = 17
ChartJS.defaults.color = "#fff";

const ReportesClientes = () => {
    const { clientes, setClientes } = useClients();
    const { user, loading } = useAuth()



    useEffect(() => {
    if(loading) return
    if(!user) return

    const loadClientes = async () => {
      try{
        const data: Cliente[] =await fetchClientes()
        setClientes(data)
      } catch (error) {
        console.error(error)
      } 
    }
    loadClientes()
  }, [user, loading, setClientes])

  // procesamos tus datos
    const activos = clientes.filter(c => c.estado === "activo").length;
    const inactivos = clientes.filter(c => c.estado === "inactivo").length;
    const nuevos = clientes.filter(c => {
    const fecha = new Date(c.creado_en);
    const hoy = new Date();
    return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    }).length;

  // gráfico de barras
    const dataBar = {
    labels: ["Activos", "Inactivos", "Nuevos"],
    datasets: [
    {
        label: "Clientes",
        color: "#fff",
        data: [activos, inactivos, nuevos],
        backgroundColor: ["#4ade80", "#f87171", "#60a5fa"],
        borderRadius: 5,
      },
    ],
  };

  // gráfico de dona
  const dataDoughnut = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        data: [activos, inactivos],
        backgroundColor: ["#4ade80", "#f87171"],
      },
    ],
  };

  //grafico de linea
  
const labelsLine = Array.from({ length: 7 }).map((_, i) =>
  dayjs().subtract(6 - i, "day").format("DD/MM")
);

const dataLineValues = labelsLine.map(label =>
  clientes.filter(c => dayjs(c.creado_en).format("DD/MM") === label).length
);

const dataLine = {
  labels: labelsLine,
  datasets: [
    {
      label: "Clientes Nuevos Últimos 7 Días",
      data: dataLineValues,
      borderColor: "#60a5fa",
      backgroundColor: "#60a5fa",
      tension: 0.3,
      fill: false,
    },
  ],
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !p-10">
      <div className="!p-10 bg-gradient-to-r to-black/50 h-110 rounded-2xl shadow-xl border border-white/10 shadow-black">
        <h3 className="text-white text-center concert-one-regular text-lg !mb-4">Distribución de Clientes</h3>
        <Bar className="!p-10 !h-auto" data={dataBar} options={{responsive: true}}/>
      </div>

      <div className="!p-10 border border-white/10 !h-110 bg-gradient-to-r flex flex-col align-center  to-black/50 rounded-2xl shadow-xl shadow-black">
        <h3 className="text-white text-lg text-center concert-one-regular !mb-4">Activos vs Inactivos</h3>
        <Doughnut className="!p-10 !h-90 !w-90 !ml-38" data={dataDoughnut} options={{responsive: true}} />
      </div>


      <div className="!p-12 !h-80 bg-gradient-to-r to-black/50 border border-white/10 rounded-2xl shadow-xl shadow-black md:col-span-2">
    <h3 className="text-white  concert-one-regular text-xl text-center !mb-4">Clientes Nuevos</h3>
    <Line data={dataLine} options={{ responsive: true, maintainAspectRatio: false }} />
  </div>
    </div>

    
  );
};

export default ReportesClientes;
