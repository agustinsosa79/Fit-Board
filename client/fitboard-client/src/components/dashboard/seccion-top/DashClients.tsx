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
        <Button className="!p-3 !m-15" radius="md" color="primary" variant="shadow" onPress={handleClick}>Ver lista completa de clientes</Button>
        <Modal  className="dark max-h-230 !pl-10" size="4xl" isOpen={modal} onClose={() => setModal(false)}>
          <ModalContent>
            <ModalBody>
              <ListaClientes />
            </ModalBody>
            <ModalFooter className="!pr-10 !pb-10 flex !bottom-2">
              <Button className="!p-1" onPress={() => setModal(false)}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
    )
}