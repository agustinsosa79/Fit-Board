import { useEffect, useState } from "react";
import { usePlanes } from "../../context/planes-context/PlanesContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ScrollShadow,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  addToast,
  Input,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { useClients } from "../../context/clientes-context/ClientesContext";
import type { Planes } from "../../types/planes";
import { useProvideAuth } from "../../context/clientes-context/useProvideAuth";
import { getPlanes } from "../../services/planesService";

export const ListaPlanes: React.FC = () => {
  const { user, loading } = useProvideAuth()
  const { clientes} = useClients();
  const { planes, eliminarPlan, actualizarPlan, setPlanes } = usePlanes();

  useEffect(() => {
    if(loading) return
    if(!user) return
    
    const loadingPlan = async () => {
      try {
        const data = await getPlanes()
        setPlanes(data)
      } catch (error) {
        console.error(error);
        
      }
    }

    loadingPlan()
  }, [user, loading, setPlanes])


  const [modal, setModal] = useState<{ isOpen: boolean; planId: string }>({
    isOpen: false,
    planId: "",
  });
  const [edit, setEdit] = useState<{ isOpen: boolean; planId: string }>({ 
    isOpen: false,
    planId: "",}
  )
  const [form, setForm] = useState({
    id: '',
    nombre: '' ,
    descripcion: '',
    duracion: 0,
    precio: 0

  }as Planes)

  const conPlan = (planId: string) => {
    return clientes.filter(c => c.plan_id  === planId) 
  }

  const handleDelete = (id: string) => {
    try {
      const asociados = conPlan(id)
      console.log(asociados);
      
      
    if (asociados.length > 0) {
      // no permitir borrar y mostrar toast
      setModal({ isOpen: false, planId: "" });
      return addToast({
        title: "No se puede eliminar el plan",
        description: `Hay ${asociados.length} cliente(s) con este plan.`,
        color: "warning",
        size: "lg",
        shouldShowTimeoutProgress: true,
        variant: "solid",
        radius: "md",
      });
    }
      eliminarPlan(id);
      setModal({ isOpen: false, planId: "" });
      addToast({
      title: "Plan eliminado",
      description: "El plan ha sido eliminado correctamente.",
      color: "success",
      size: "lg",
      shouldShowTimeoutProgress: true,
      variant: "solid",
      radius: "md",
    });
      
    } catch (error) {
      console.error(error);
    }
  };
  const formatCurrency = (amount: number) =>{ 
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(amount);
  }


  const handleEdit = (planId: string) => {
    const plan = planes.find(p => p.id === planId)
     

    if (!plan) {
      <p>Plan no encontrado</p>
      return
    }
    setForm({
      id: plan.id,
      nombre: plan?.nombre,
      descripcion: plan?.descripcion,
      duracion: plan?.duracion,
      precio: plan?.precio
    })
    setEdit({isOpen: true, planId})
  }
  

  return (
    <>
      <h2 className="concert-one-regular text-2xl text-center !m-6">
        Tus Planes
      </h2>

      {planes.length === 0 && (
        <p className="text-gray-400 text-center">No hay planes disponibles</p>
      )}

      <ScrollShadow hideScrollBar className="w-[750px] h-[718px]">
        <div className="!grid grid-cols-1 sm:grid-cols-2 !lg:grid-cols-3 !gap-0 !p-0">
          {planes.map(({ id, precio, nombre, duracion, descripcion }) => (
            <Card key={id} shadow="sm" className=" text-white  !p-5 !ml-10 !mt-2 rounded-lg bg-white/4 border border-white/8">
              <CardHeader className="!flex !flex-col !items-start">
                <h2 className="!text-xl !font-bold !mt-3 !mb-4">{nombre}</h2>
                <div className="bg-black/20 !border !border-white/10 rounded-2xl w-full !p-2">
                <p className="font-bold">Duración</p>
                <p className="!text-sm text-gray-300">{duracion} meses</p>
                </div>
              </CardHeader>

              <CardBody className="!text-gray-200 bg-black/20 !border !border-white/10 !p-2 rounded-2xl !mt-2 !mb-2">
                <h3 className="font-bold !mb-2">Descripción:</h3>
                <p >{descripcion}</p>
              </CardBody>

              <CardFooter className="flex justify-between items-center">

                <span className="text-lg font-bold bg-black/20 !border rounded-2xl  !border-white/10 !m-1 !p-2">Precio: {formatCurrency(precio)}</span>
                <Button
                onPress={() => handleEdit(id)}
                size="sm"

                className="!p-3 !ml-4 "
                >
                  Editar Plan
                </Button>
                <Button
                  onPress={() => setModal({ isOpen: true, planId: id })}
                  color="danger"
                  radius="sm"
                  size="sm"
                  className="!p-3 !m-1"
                >
                  Eliminar Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    

      {/* Modal controlado */}
      <Modal
        closeButton={false}
        isOpen={modal.isOpen}
        onOpenChange={(open) => setModal({ isOpen: open, planId: modal.planId })}
        className="!p-5 flex gap-2 !bg-gradient-to-br from-black/95  to-black border !border-white/20 text-white"
      >
        <ModalContent>
          <ModalHeader>Eliminar Plan</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar este plan?
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onPress={() => {
                handleDelete(modal.planId)
              }}
            >
              Eliminar
            </Button>
            <Button
              onPress={() => setModal({ isOpen: false, planId: "" })}
              variant="solid"
              className="text-white"
              color="secondary"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
      size="lg"
      className="dark flex flex-col items-center justify-self-end  shadow-2xl border border-white/20 shadow-black" 
  closeButton={false}
  isOpen={edit.isOpen}
  onOpenChange={(open) => setEdit({ isOpen: open, planId: edit.planId })}
>
  <ModalContent className=" !flex !flex-col !gap-8 text-center">
    <ModalHeader className="!text-center !p-8">
      <h2 className="!text-center text-2xl concert-one-regular text-white">Edita el plan</h2>
    </ModalHeader>
    <ModalBody className="flex flex-col !gap-15 w-100">
      <Input
      className="border border-white/30 shadow-lg shadow-black animate-appearance-in rounded-xl"
        label="Nombre:"
        labelPlacement="outside"
        variant="flat"
        type="text"
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <Input
      className="border border-white/30 shadow-lg shadow-black animate-appearance-in rounded-xl"
        label="Descripción"
        labelPlacement="outside"
        type="text"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />
      <Input
      className="border border-white/30 shadow-lg shadow-black animate-appearance-in rounded-xl"
        label="Duración"
        labelPlacement="outside"
        type="text"
        value={form.duracion.toString()}
        onChange={(e) => setForm({ ...form, duracion: Number(e.target.value) })}
      />
      <Input
      className="border border-white/30 shadow-lg shadow-black animate-appearance-in rounded-xl"
        label="Precio"
        labelPlacement="outside"
        type="text"
        value={form.precio.toString()}
        onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
      />
    </ModalBody>
    <ModalFooter className=" !p-8">
      <Button
        onPress={async () => {
          await actualizarPlan(form)
          // actualiza localmente para que se vea en la UI
          setEdit({ isOpen: false, planId: '' }); // cerrar modal
          addToast({
            title: "Plan actualizado",
            description: "El plan se actualizó correctamente.",
            color: "success",
          });
        }}
      >
        Guardar
      </Button>
      <Button onPress={() =>  setEdit({ isOpen: false, planId: '' })} >
        Cancelar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
};
