import dayjs from "dayjs"
import { useClients } from "../../../context/clientescontext/ClientesContext"
import { usePlanes } from "../../../context/planescontext/PlanesContext"

export const useFechaVencimiento = () => {
    const {planes} = usePlanes()
    const {clientes = []} = useClients()
        return clientes.map( (c) =>{
            const plan = planes.find((p) => p.id === c.plan_id )
            if(!plan) return {...c, vence: null}

            const inicio = dayjs(c.creado_en)
            const vence = inicio.add(plan.duracion, 'months')
            return {
    ...c,
    inicio: inicio.format("YYYY-MM-DD"),
    vence: vence.format("YYYY-MM-DD"),
    activo: dayjs().isBefore(vence), // true si todavía está vigente
  };
        })
    }
