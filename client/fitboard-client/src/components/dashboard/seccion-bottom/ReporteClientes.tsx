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
  Filler,
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
    Legend, 
    Filler
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
    const activos = Array.isArray(clientes) ? clientes.filter(c => c.estado === "activo").length : 0
    const inactivos = Array.isArray(clientes) ? clientes.filter(c => c.estado === "inactivo").length : 0
    const nuevos = Array.isArray(clientes) ? clientes.filter(c => {
    const fecha = new Date(c.creado_en)
    const hoy = new Date();
    return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    }).length: 0

  // gráfico de barras
    const dataBar = {
  labels: ["Activos", "Inactivos", "Nuevos"],
  datasets: [
    {
      label: "Clientes",
      data: [activos, inactivos, nuevos],
      backgroundColor: [
        "#3b82f6", // Tailwind blue-500
        "#ef4444", // Tailwind red-500
        "#22c55e", // Tailwind green-500
      ],
      borderColor: "#1f2937", // Tailwind gray-800
      borderWidth: 2,
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
      label: "Últimos 7 Días",
      data: dataLineValues,
      borderColor: "#60a5fa",
      backgroundColor: "#60a5fa",
      tension: 0.3,
      borderWitdh: 3,
      fill: true
    },
  ],
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center items-center p-0 md:!p-10">
      <div className="md:!p-10 !p-2 text-xs flex flex-col items-center bg-gradient-to-r !max-w-full h-60 to-black/50  md:!w-auto md:h-110 rounded-2xl shadow-xl border border-white/10 shadow-black">
        <h3 className="text-white text-center concert-one-regular text-lg md:!mb-4 md:text-2xl !mb-10">Distribución de Clientes</h3>
        <Bar className="md:!p-0 md:object-contain !size-60 !p-0 text-xs md:!size-130 !h-auto " data={dataBar} options={{responsive: true,  scales: {
      x: {
        grid: {
          color: "#4b5563", // líneas del fondo eje X (Tailwind gray-600)
        },
        ticks: {
          color: "#fff", // texto del eje X
        },
      },
      y: {
        grid: {
          color: "#4b5563", // líneas del fondo eje Y
        },
        ticks: {
          color: "#fff", // texto del eje Y
        },
      },
    },
  }}/>
      </div>

      <div className="md:!p-10 !p-2 text-xs flex flex-col items-center bg-gradient-to-r !max-w-full h-60 to-black/50  md:!w-auto md:h-110 rounded-2xl shadow-xl border border-white/10 shadow-black">
        <h3 className="text-white text-lg md:text-lg text-center concert-one-regular !mb-4">Activos vs Inactivos</h3>
        <Doughnut className="md:!p-10 !object-contain text-xs !size-40 md:!h-90 md:!w-90 " data={dataDoughnut} options={{responsive: true}} />
      </div>


      <div className="!p-12 !h-80 bg-gradient-to-r to-black/50 border border-white/10 rounded-2xl shadow-xl shadow-black col-span-1 md:col-span-2">
    <h3 className="text-white  concert-one-regular text-xl text-center !mb-4">Clientes Nuevos</h3>
    <Line className="md:!max-w-full max-w-w-full object-contain" data={dataLine} options={{ responsive: true, maintainAspectRatio: false, scales: {
      x: {
        grid: {
          color: "#4b5563", // líneas del fondo eje X (Tailwind gray-600)
        },
        ticks: {
          color: "#fff", // texto del eje X
        },
      },
      y: {
        grid: {
          color: "#4b5563", // líneas del fondo eje Y
        },
        ticks: {
          color: "#fff", // texto del eje Y
        },
      },
    }, }} />
  </div>
    </div>

    
  );
};

export default ReportesClientes;
