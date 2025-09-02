
import { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@heroui/react";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router";
import logo from "../../assets/logo-fit.png"; // Asegúrate de que la ruta sea correcta
import { useAuth } from "../../context/clientes-context/useAuth";

interface Props {
  isOpenNav: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function MobileSidebar({ isOpenNav, setIsOpen }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth()
  const { isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

  const MENU = [
    { label: "Dashboard", path: "/", Icon: HomeIcon },
    { label: "Clientes", path: "/clientes", Icon: UsersIcon },
    { label: "Planes", path: "/planes", Icon: ClipboardDocumentListIcon },
  ];

  useEffect(() => {
    if (isOpenNav) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleConfirmLogout = () => {
    onOpen()
    onOpenChange()
  }

  return (
    <>
      <Navbar
  className="sm:hidden  !top-0 bg-black border-none !p-4 !h-auto left-0 w-full z-5"
  isBordered
  isMenuOpen={isOpenNav}
  onMenuOpenChange={setIsOpen}
  shouldHideOnScroll
>
  <NavbarContent justify="center" className=" sm:flex gap-4">
    <NavbarMenuToggle aria-label={isOpenNav ? "Close menu" : "Open menu"} style={{padding: "1rem"}} />
  </NavbarContent>

  <NavbarContent justify="center" className="pr-3">
    <NavbarBrand className="flex items-center">
      <img src={logo} alt="" className="w-40 h-auto object-contain mb-30" />
    </NavbarBrand>
  </NavbarContent>

  {/* NAVBAR MENU: HeroUI ya lo controla */}
  <NavbarMenu className=" bg-black/98 h-max border backdrop-blur-xs  !p-10 shadow-2xl" style={{marginTop: "2rem"}}>
    {MENU.map((item) => (
      <NavbarMenuItem key={item.path} className="w-full pl-10" style={{marginLeft: "3px"}}>
        <button
          onClick={() => {
            setIsOpen(false);
            navigate(item.path);
          }}
          className="w-full !text-left flex items-center !px-4 !py-3 rounded-lg bg-white/2 gap-5 h-20 transition-colors size-3.5 font-bold hover:bg-white/10 focus:bg-white/10"
        >
          <item.Icon className="w-5 h-5 text-white" />
          <span className="text-white">{item.label}</span>
        </button>
      </NavbarMenuItem>
    ))}
    <Button className="!mt-10 font-bold text-white" color="warning" onPress={handleConfirmLogout}>Cerrar sesión</Button>
    <Modal 
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="!p-8"
    >
      <ModalContent className="bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900/90  text-white">
      <ModalHeader>
      <h2>¿Estas seguro que quieres cerrar sesión?</h2>
      </ModalHeader>
      <ModalBody>
        <p>Tendras que volver a iniciar sesión</p>
      </ModalBody>
      <ModalFooter className="!pt-5">
        <Button color="primary" className="font-semibold" onPress={onClose}>Cancelar</Button>
        <Button color="danger" size="md" className="!p-2 font-semibold" onPress={logout}>Cerrar Sesión</Button>
      </ModalFooter>
      </ModalContent>
    </Modal>
  </NavbarMenu>
</Navbar>

    </>
  );
}
