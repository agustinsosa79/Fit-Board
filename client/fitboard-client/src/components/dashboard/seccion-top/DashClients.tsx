import { Modal, ModalContent, ModalFooter, ModalBody, Button } from "@heroui/react";
import ListaClientes from "../../clientes/ListaClientes";
import { useState } from "react";

export const DashClients = () => {
    const [modal, setModal] = useState(false);

    const handleClick = () => {
        setModal(true);
    };

    return(
        <>
        <Button className="!p-3 !m-15 !shadow-2xl shadow-black" radius="md" color="primary" variant="solid" onPress={handleClick}>Ver lista completa de clientes</Button>
        <Modal  className="dark md:flex w-full md:bottom-0  md:!pl-10 md:!h-230 h-dvh  overflow-hidden" size="4xl" isOpen={modal} onClose={() => setModal(false)}>
          <ModalContent>
            <ModalBody>
              <ListaClientes />
            </ModalBody>
            <ModalFooter className="!pr-10 !pb-10 flex !bottom-2">
              <Button className="md:!p-2 !mb-10" onPress={() => setModal(false)}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    )
}