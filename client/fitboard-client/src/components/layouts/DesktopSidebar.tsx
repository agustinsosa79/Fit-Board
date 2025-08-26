import { Sidebar, MenuItem, Logo } from "react-mui-sidebar";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import logo from "../../assets/logo-fit.png"; 
import { useAuth } from "../../context/clientes-context/useAuth";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";


export const DesktopSidebar = () => {
    const { user, logout } = useAuth();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleConfirmLogout = () => {
        onOpen()
        onOpenChange(); 
    };

    return (
    <>
        <div className="bg-black h-screen hidden lg:flex flex-col fixed top-0 left-0 z-50 w-[270px] !shadow-xl  !shadow-black">
        <Sidebar
        width={"270px"}
        mode="dark"
        themeSecondaryColor="#49beff"
        userName={user?.nombre}
        textColor="white"
        onLogout={handleConfirmLogout}
        designation={user?.admin_id ? "Administrador" : "Usuario"}
        >
            <div className="p-4 bg-gradient-to-b from-black/10 via-gray-950/99 rounded-4xl  shadow-white/90 flex items-center justify-center !mb-10">
        <Logo img={logo}>FitCore</Logo>
            </div>
            <div className="flex flex-col gap-6 !ml-5 ">
                <Link to={"/"} >
            <MenuItem icon={<HomeIcon />} >
                <span className="concert-one-regular text-lg">Inicio</span>
            </MenuItem>
                </Link>
                <Link to={"/clientes"}>
                    <MenuItem icon={<PersonSearchIcon />}>
                        <span className="concert-one-regular text-lg">Clientes</span>
                    </MenuItem>
                </Link>
                <Link to={"/planes"}>
                    <MenuItem icon={<ArticleIcon />}>
                        <span className="concert-one-regular text-lg">Planes</span>
                    </MenuItem>
                </Link>
                <Link to={"/turnos"}>
                    <MenuItem icon={<EditCalendarIcon />}>
                        <span className="concert-one-regular text-lg">Turnos</span>
                    </MenuItem>
                </Link>
                <Link to={"/ajustes"}>
                    <MenuItem icon={<SettingsIcon />}>
                        <span className="concert-one-regular text-lg">Reportes</span>
                    </MenuItem>
                </Link>
            </div>
        </Sidebar>
                <Button variant="shadow" color="secondary" onClick={handleConfirmLogout} className="flex text-white font-bold  top-0 left-5 m-1 w-56 items-center justify-center">Cerrar sesión</Button>
    </div>

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
