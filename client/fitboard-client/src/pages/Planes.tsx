import { PlanesForm } from "../components/planes/form/PlanesForm"
import { ListaPlanes } from "../components/planes/ListaPlanes"

export const Planes = () => {

    return (
        <div className="md:h-screen max-w-full flex flex-col md:flex md:flex-row justify-center items-start gap-12 !p-1 !m-2 h-vw text-white">
  {/* Formulario de creación de planes */}
  <div className="md:w-1/3 rounded-xl  md:!m-8 shadow-2xl md:!mt-6 !mt-5 shadow-black bg-black/90">
    <h2 className="text-3xl !mb-19 md:!mb-0 !p-2 !text-center concert-one-regular md:!mt-10">Crear Plan</h2>
    <PlanesForm />
  </div>

  {/* Lista de planes */}
  <div className="md:w-1/2 max-w-full bg-black/90 rounded-xl shadow-2xl shadow-black !p-13 !m-0">
    <ListaPlanes />
  </div>
</div>
    )
}