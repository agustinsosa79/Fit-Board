import { Sidebar, MenuItem, Logo } from "react-mui-sidebar";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArticleIcon from '@mui/icons-material/Article';
import logo from "../../assets/logo-fit.png"; 
import { useAuth } from "../../context/clientescontext/useAuth";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";


export const DesktopSidebar = () => {
    const { user, logout } = useAuth();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const handleConfirmLogout = () => {
        onOpen()
        onOpenChange(); 
    };

    if (!user) return


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
            <div className="flex flex-col gap-6 !mb-90 !ml-5 ">
            <MenuItem icon={<HomeIcon />} component={Link} link="/" >
                <span className="concert-one-regular text-lg">Inicio</span>
            </MenuItem>
                    <MenuItem icon={<PersonSearchIcon />} component={Link} link="/clientes">
                        <span className="concert-one-regular text-lg">Clientes</span>
                    </MenuItem>
                    <MenuItem icon={<ArticleIcon />} component={Link} link="/planes">
                        <span className="concert-one-regular text-lg">Planes</span>
                    </MenuItem>
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
