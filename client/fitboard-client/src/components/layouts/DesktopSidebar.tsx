import { Sidebar, MenuItem, Logo } from "react-mui-sidebar";
import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import logo from "../../assets/logo-fit.png"; 
import { useAuth } from "../../context/useAuth";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
export const DesktopSidebar = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleConfirmLogout = () => {
    onOpen()
    onOpenChange(); // cerramos el modal
  };

  


  return (
    <>
      <div className="bg-black  h-screen hidden lg:flex flex-col ">
        <Sidebar
          width={"270px"}
          mode="dark"
          themeSecondaryColor="#49beff"
          userName={user?.nombre}
          textColor="white"
          onLogout={handleConfirmLogout}
          designation={user?.admin_id ? "Administrador" : "Usuario"}
        >
          <Logo img={logo}>FitCore</Logo>
            <div className="flex flex-col gap-6 ">
              <MenuItem icon={<HomeIcon />} link="/" >
                <span className="font-semibold p-10">Inicio</span>
              </MenuItem>
              <MenuItem link="/clientes" icon={<PersonSearchIcon />}>
                <span className="font-semibold p-10">Clientes</span>
              </MenuItem>
              <MenuItem link="/planes" icon={<ArticleIcon />}>
                <span className="font-semibold p-10">Planes</span>
              </MenuItem>
              <MenuItem link="/turnos" icon={<EditCalendarIcon />}>
                <span className="font-semibold p-10">Turnos</span>
              </MenuItem>
              <MenuItem link="/ajustes" icon={<SettingsIcon />}>
                <span className="font-semibold p-10">Ajustes</span>
              </MenuItem>
              {/* Botón de logout */}
              
            </div>
        </Sidebar>
                <Button onClick={handleConfirmLogout} className="bg-red-500 flex text-white font-bold  top-0 left-5 m-1 w-56 items-center align-center">Cerrar sesión</Button>
      </div>

      {/* Modal de confirmación */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl" style={{padding: "30px"}} className="bg-gray-950 text-white">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmar cierre de sesión</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que quieres cerrar sesión?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={logout}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
