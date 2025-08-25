import { useState } from "react";
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
} from "@heroui/react";
import { Button } from "@heroui/react";
import { useClients } from "../../context/clientes-context/ClientesContext";

export const ListaPlanes: React.FC = () => {
  const { clientes } = useClients();
  const { planes, eliminarPlan } = usePlanes();
  const [modal, setModal] = useState<{ isOpen: boolean; planId: string }>({
    isOpen: false,
    planId: "",
  });

  const handleDelete = (id: string) => {
    eliminarPlan(id);
    setModal({ isOpen: false, planId: "" });
  };
  const formatCurrency = (amount: number) =>{ 
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <>
      <h2 className="concert-one-regular text-2xl text-center !m-6">
        Tus Planes
      </h2>

      {planes.length === 0 && (
        <p className="text-gray-400 text-center">No hay planes disponibles</p>
      )}

      <ScrollShadow hideScrollBar className="w-[750px] h-[700px]">
        <div className="!grid grid-cols-1 sm:grid-cols-2 !lg:grid-cols-3 !gap-6 !p-6">
          {planes.map(({ id, precio, nombre, duracion, descripcion }) => (
            <Card key={id} shadow="sm" className=" text-white  !p-5 !mt-2 rounded-lg bg-white/4 border border-white/8">
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
                  onPress={() => setModal({ isOpen: true, planId: id })}
                  color="danger"
                  radius="md"
                  size="sm"
                  className="!p-3"
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
                if (clientes.length > 0) {
                  setModal({ isOpen: false, planId: "" });
                  return addToast({
                    title: "No se puede eliminar el plan",
                    description: "El cliente tiene un plan activo.",
                    color: "warning",
                    size: "lg",
                    shouldShowTimeoutProgress: true,
                    variant: "solid",
                    radius: "md",
                    });
                }
                handleDelete(modal.planId);
                addToast({
                  title: "Plan eliminado",
                  description: "El plan ha sido eliminado correctamente.",
                  color: "success",
                  size: "lg",
                  shouldShowTimeoutProgress: true,
                  variant: "solid",
                  radius: "md",
                });
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
    </>
  );
};
