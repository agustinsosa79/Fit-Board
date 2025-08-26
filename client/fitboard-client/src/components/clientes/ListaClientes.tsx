// src/components/clientes/ListaClientes.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useClients } from "../../context/clientes-context/ClientesContext";
import { deleteCliente } from "../../services/clientesService";
import { Button, Alert,Modal, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import type { Cliente } from "../../types/clientes";
import InfoIcon from '@mui/icons-material/Info';
import { usePlanes } from "../../context/planes-context/PlanesContext";
const PER_PAGE = 8;

export const ListaClientes: React.FC = () => {
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
    return clientes.filter((c) => {
      if (filter !== "all" && c.estado !== filter) return false;
      if (!q) return true;
      return (
        c.nombre.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.dni && String(c.dni).includes(q))
      );
    });
  }, [clientes, debounceQuery, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar un cliente (optimista y seguro)
  const handleDeleteOne = async (id: string) => {
    const cliente = clientes.find(c => c.id === id);

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
    setSelectedClient(cliente)
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
    <div className=" w-200 !m-6 lg:!m-10 rounded-2xl bg-black/90 shadow-2xl shadow-black !p-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="concert-one-regular text-white text-2xl font-bold !mr-0 !mb-10 ">Lista de Clientes</h1>
            <p className="!flex gap-2 w-50 !bg-gray-600/20 !border-gray-600/30 !justify-center !p-2 !mb-2 !rounded-lg border text-white">
            <span>Total: {clientes.length}</span>
            <span className="!pl-2">Mostrando: {filtered.length}</span>
            </p>
        </div>

        <div className="flex items-center gap-3 !mt-17 !p-3 !ml-2">
          <div className="flex items-center bg-white/5 rounded-lg border-amber-50/10 border px-3 py-2 gap-2">
            <SearchIcon className="text-gray-300 !m-2" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar por nombre, email o DNI..."
              className="bg-transparent text-white placeholder-gray-400 outline-none w-65"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value as "all" | "activo" | "inactivo"); setPage(1); }}
            className="!bg-white/5 text-white !px-2 !py-2 rounded-md border border-gray-600/30 "
          >
            <option className="!bg-black/90" value="all">Todos</option>
            <option className="bg-black/90" value="activo">Activos</option>
            <option className="bg-black/90" value="inactivo">Inactivos</option>
          </select>
        </div>
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



      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y ">
        {loading ? (
            Array.from({ length: PER_PAGE }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-white/4 border border-white/8 animate-pulse !h-28" />
        ))
    ) : pageItems.length === 0 ? (
        <div className="!p-6 rounded-lg bg-white/4 border border-white/8 col-span-full text-gray-300">No hay clientes que coincidan.</div>
    ) : (
        pageItems.map((cliente) => (
            <div key={cliente.id} className="!p-5 !mt-2 rounded-lg bg-white/4 border border-white/8 flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white font-semibold uppercase">
                    {cliente.nombre?.slice(0, 1) ?? "?"}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{cliente.nombre}</div>
                  </div>
                </div>

                <div className="!mt-3 text-gray-300 !text-sm">
                  <div><span className="font-medium text-white mr-2">DNI: </span>{cliente.dni}</div>
                  <div className="!mt-1"><span className="font-medium text-white mr-2">Estado: </span>{cliente.estado}</div>
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
      </div>
      
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
    <ModalBody className="!space-y-8">
      
      {/* Datos personales */}
      <section>
        <h4 className="!font-semibold !text-xl !mb-4 !border-b !border-white/10 !pb-2">
          Datos personales
        </h4>

        <div className="!grid !grid-cols-2 !gap-y-3 !gap-x-6 !text-sm bg-black/90 !p-10 rounded-2xl !mb-8 shadow-xl shadow-black !m-3">
          <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Email:</span> {selectedClient?.email}</p>
          <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Teléfono:</span> {selectedClient?.telefono}</p>
          {selectedClient?.direccion && (
            <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">Dirección:</span> {selectedClient?.direccion}</p>
          )}
          {selectedClient?.dni && (
            <p className="bg-gray-700/10 border-b border-white/30 !p-3 rounded-full shadow-xl shadow-black"><span className="!font-semibold text-white">DNI:</span> {selectedClient?.dni}</p>
          )}
          <p className="bg-gray-700/10 border-b border-green-400/30 !p-3 rounded-full shadow-xl shadow-black">
            <span className="!font-semibold text-white">Plan:</span>{" "}
            {selectedClient?.plan_id
              ? (() => {
                  const plan = planes.find(p => p.id === selectedClient.plan_id);
                  return plan
                    ? `${plan.nombre} (${plan.duracion} meses) $${plan.precio}`
                    : "Plan no encontrado";
                })()
              : "Sin plan asignado"}
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
        <div className="text-gray-300">
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
