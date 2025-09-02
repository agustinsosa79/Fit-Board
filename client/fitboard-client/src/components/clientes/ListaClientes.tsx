// src/components/clientes/ListaClientes.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useClients } from "../../context/clientes-context/ClientesContext";
import { deleteCliente, fetchClientes } from "../../services/clientesService";
import { Button, Alert,Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure, ScrollShadow } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import type { Cliente } from "../../types/clientes";
import InfoIcon from '@mui/icons-material/Info';
import { usePlanes } from "../../context/planes-context/PlanesContext";
import { useProvideAuth } from "../../context/clientes-context/useProvideAuth";
import { useFechaVencimiento } from "./vencimiento/ClienteVence";

const PER_PAGE = 6;

export const ListaClientes: React.FC = () => {
  const {user} = useProvideAuth()
  const { clientes = [], setClientes, loading } = useClients();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "activo" | "inactivo">("all");
  const [page, setPage] = useState(1);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [debounceQuery, setDebounceQuery] = useState("");
  const { planes } = usePlanes();
  const clientesConVencimiento = useFechaVencimiento()


  useEffect(() => {
    if(loading) return
    if(!user) return

    const loadClientes = async () => {
      try{
        const data: Cliente[] =await fetchClientes()
        setClientes(data)
      } catch (error) {
        console.error(error)
      } 
    }
    loadClientes()
  }, [user, loading, setClientes])
  

  const pushMessage = (text: string, type: "success" | "error" = "success", ttl = 4000) => {
    setMessage({ text, type });
    window.setTimeout(() => setMessage(null), ttl);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(query);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Filtrado y búsqueda
  const filtered = useMemo(() => {
    const q = debounceQuery.trim().toLowerCase();
    return clientesConVencimiento.filter((c) => {
      if (filter !== "all" && c.estado !== filter) return false;
      if (!q) return true;
      return (
        c.nombre.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.dni && String(c.dni).includes(q)) ||
        (c.vence && c.vence.toLowerCase().includes(q))
      );
    });
  }, [clientesConVencimiento, debounceQuery, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteOne = async (id: string) => {
    const cliente = clientesConVencimiento.find((c) => c.id === id);

    const backup = [...clientes];
    try {
      setWorking(true);
      // Optimista: removemos del estado para UX rápida
      setClientes(backup.filter((c) => c.id !== cliente?.id));

      // Petición al backend
      await deleteCliente(id);
      pushMessage(`Cliente "${cliente?.nombre}" eliminado.`, "success");
    } catch (err) {
      console.error("Error eliminando cliente:", err);
      // revertir estado si falla
      setClientes(backup);
      pushMessage("Error al eliminar cliente. Intenta nuevamente.", "error");
    } finally {
      setWorking(false);
    }
  };

   const openModal = (cliente: Cliente) =>{
      const clienteConVencimiento = clientesConVencimiento.find(c => c.id === cliente.id)
      if(!clienteConVencimiento) return
    setSelectedClient(clienteConVencimiento)
    setModal(true)
   } 

   const { onOpenChange } = useDisclosure()

    const confirmDelete = (id?: string) =>{
      if(!id) return;
      handleDeleteOne(id);
      onOpenChange()
      setModal(false);
    }



  return (
    <div className=" w-80% md:w-200 !p-3  !m-2 lg:!m-5 rounded-2xl bg-black/90 shadow-2xl  overflow-y-hidden shadow-black md:!p-20 ">
      <div className="flex md:items-end md:justify-between mb-6">
          <h1 className="concert-one-regular text-white text-lg md:text-2xl font-bold !mr-0 !mb-3 ">Lista de Clientes</h1>
            <p className=" hidden md:!flex md:!mt-18 gap-0 flex-col md:flex-row md:w-80 !bg-gray-600/20 !border-gray-600/30 !justify-center !p-2 !mb-2 !rounded-lg border text-white">
            <span>Total: {clientes.length}</span>
            <span className="md:!pl-1 text-end !ml-10  hidden md:flex">Mostrando: {filtered.length}</span>
            </p>

        <div className="md:flex items-center !grid-cols-1 md:grid-row-1 gap-3 !mt-17 !pb-2 !ml-5">
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value as "all" | "activo" | "inactivo"); setPage(1); }}
            className="!bg-white/5 text-white !ml-1 !px-19 !py-2 rounded-md border border-gray-600/30 "
          >
            <option className="!bg-black/90" value="all">Todos</option>
            <option className="bg-black/90" value="activo">Activos</option>
            <option className="bg-black/90" value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>
          <div className="flex items-center md:m-0 !mb-2 bg-white/5 rounded-lg border-amber-50/10 border !px-3  md:!gap-2">
            <SearchIcon className="text-gray-300 !m-2" />
            <input
              value={query}
              onChange={(e) => { setQuery(() => e.target.value); setPage(1); }}
              placeholder="Buscar por nombre, email o DNI..."
              className="bg-transparent text-white placeholder-gray-400 outline-none w-full md:m-0 md:w-58"
            />
          </div>

      <AnimatePresence>
        {message && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            <Alert color={message.type === "error" ? "danger" : "success"} variant="solid" className="mb-4 fixed w-160">
              {message.text}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>



      <ScrollShadow hideScrollBar className="grid grid-cols-1  !justify-center md:grid-cols-2 gap-5 md:w-full md:h-100 w-[250px] h-[280px] ">
        {loading ? (
            Array.from({ length: PER_PAGE }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/4 border border-white/8 animate-pulse !h-28" />
        ))
    ) : pageItems.length === 0 ? (
        <div className="!p-6 rounded-lg bg-white/4 border border-white/8 col-span-full text-gray-300">No hay clientes que coincidan.</div>
    ) : (
        pageItems.map((cliente) => (
            <div key={cliente.id} className="md:!p-5 md:!mt-2 !p-2 max-w-full rounded-lg bg-white/4 border border-white/8 flex justify-center md:justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white font-semibold uppercase">
                    {cliente?.nombre.slice(0, 1) ?? "?"}
                  </div>
                  <div>
                    <div className="text-white text-sm md:text-md font-semibold">{cliente.nombre}</div>
                  </div>
                </div>

                <div className="!mt-3 text-gray-300 !text-sm">
                  <div><span className="!font-medium !text-xs md:text-md text-white mr-2">DNI: </span>{cliente.dni}</div>
                  <div className="!mt-1"><span className="font-medium !text-xs md:text-md text-white mr-2">Estado: </span>{cliente.estado}</div>
                </div>
              </div>

              <div className="flex flex-col !items-end gap-2">
                <div className="flex !gap-4 !mt-6  !pr-0">
                  <Button color="secondary" size="sm"  className="!p-2" onPress={() => openModal(cliente)} disabled={working}>
                    <InfoIcon style={{ fontSize: 15 }} />
                    Ver detalles
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollShadow>
      
      <Modal
  backdrop="opaque"
  isOpen={modal}
  onOpenChange={() => setModal(false)}
  size="3xl"
  placement="center"
  scrollBehavior="inside"
> 
  <ModalContent className="!bg-gradient-to-br from-black/98 to-black/99 !text-white rounded-2xl !p-10 !mx-auto !shadow-2xl">

    {/* HEADER */}
    <ModalHeader className="!text-3xl !font-bold !border-b !border-white/10 !pb-4 !mb-4">
      {selectedClient?.nombre}
    </ModalHeader>

    {/* BODY */}
    <ModalBody className="!space-y-8  !overflow-hidden">
      
      {/* Datos personales */}
      <section>
        <h4 className="!font-semibold !text-xl !mb-4 !border-b !border-white/10 !pb-2 !overflow-hidden">
          Datos personales
        </h4>

        <div className="!grid !grid-cols-2 !gap-y-3 !gap-x-6 !text-sm bg-black/70 !p-10 rounded-2xl !mb-8 shadow-xl shadow-black !m-3">
          <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Email:</span> {selectedClient?.email}</p>
          <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Teléfono:</span> {selectedClient?.telefono}</p>
          {selectedClient?.direccion && (
            <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Dirección:</span> {selectedClient?.direccion}</p>
          )}
          {selectedClient?.dni && (
            <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">DNI:</span> {selectedClient?.dni}</p>
          )}
          <p className="bg-gray-700/10 border-b border-green-400/30 !p-3 rounded-full shadow-xl shadow-black">
            <span className="!font-bold text-green-400">Plan:</span>{" "}
            {selectedClient?.plan_id
              ? (() => {
                  const plan = planes.find(p => p.id === selectedClient.plan_id);
                  return plan
                    ? `${plan.nombre} (${plan.duracion} meses) $${plan.precio}`
                    : "Plan no encontrado";
                })()
              : "Sin plan asignado"}
          </p>
          <p className="bg-gray-700/10 border-b border-red-900/80 !p-3 rounded-full shadow-xl shadow-black">
            <span className="!font-bold text-red-500">Vencimiento: </span>
              {selectedClient?.vence}
          </p>
        </div>
      </section>

    </ModalBody>

    {/* FOOTER */}
    <ModalFooter className="!flex !justify-between !pt-8 border-t border-white/10 mt-4">
      <Button
        color="danger"
        variant="shadow"
        size="md"
        className="!px-6 !py-2 !font-bold"
        onPress={() => {
          setModalEliminar(true);
          setModal(false);
        }}
        disabled={working}
      >
        <DeleteIcon className="!mr-1" /> Eliminar
      </Button>

      <Button
      size="md"
        color="secondary"
        variant="shadow"
        onPress={() => setModal(false)}
        className="!px-6  !font-bold"
      >
        Cerrar
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>



    <Modal
      backdrop="opaque"
      isOpen={modalEliminar}
      onOpenChange={() => setModalEliminar(false)}
      size="lg"
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="!bg-gradient-to-br from-black/95 to-black/99 border border-white/20 !text-white rounded-xl !p-6 max-w-2xl mx-auto">
        <ModalHeader className="text-2xl font-bold">
          Confirmar eliminación
        </ModalHeader>
        <ModalBody className="space-y-4">
          <p>¿Estás seguro de que deseas eliminar a {selectedClient?.nombre}?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="shadow" onPress={() => {setModalEliminar(false); setModal(true)}}>
            Cancelar
          </Button>
          <Button color="danger" variant="shadow" size="md" className="!p-2" onPress={() => {confirmDelete(selectedClient?.id); setModalEliminar(false)}} disabled={working}>
            Eliminar Cliente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

      {/* paginado */}
      <div className="flex items-center justify-between !mt-4">
        <div className="text-gray-300 text-xs">
          Página {page} / {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button color="warning" className="px-3 py-1 rounded bg-white/6 text-white" onPress={() => goTo(page - 1)} disabled={page === 1}>Anterior</Button>
          <Button color="secondary" className="px-3 py-1 rounded bg-white/6 text-white" onPress={() => goTo(page + 1)} disabled={page === totalPages}>Siguiente</Button>
        </div>
      </div>
    </div>
  );
};

export default ListaClientes;
