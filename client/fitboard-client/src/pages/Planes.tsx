import { PlanesForm } from "../components/planes/form/PlanesForm"
import { ListaPlanes } from "../components/planes/ListaPlanes"

export const Planes = () => {

    return (
        <div className="h-screen flex flex-row justify-center items-start gap-12 !p-8  text-white">
  {/* Formulario de creación de planes */}
  <div className="w-1/3 rounded-xl  !m-8 shadow-2xl shadow-black bg-black/90">
    <h2 className="text-3xl !text-center concert-one-regular !mt-10">Crear Plan</h2>
    <PlanesForm />
  </div>

  {/* Lista de planes */}
  <div className="w-1/2 bg-black/90 rounded-xl shadow-2xl shadow-black !m-10">
    <ListaPlanes />
  </div>
</div>
    )
}