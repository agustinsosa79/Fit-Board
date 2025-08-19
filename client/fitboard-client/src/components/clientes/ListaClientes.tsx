// src/components/clientes/ListaClientes.tsx
import React, { useMemo, useState } from "react";
import { useClients } from "../../context/ClientesContext";
import { deleteCliente } from "../../services/clientesService";
import { Button, Alert } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const PER_PAGE = 8;

export const ListaClientes: React.FC = () => {
  const { clientes = [], setClientes, loading } = useClients();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "activo" | "inactivo">("all");
  const [page, setPage] = useState(1);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const pushMessage = (text: string, type: "success" | "error" = "success", ttl = 4000) => {
    setMessage({ text, type });
    window.setTimeout(() => setMessage(null), ttl);
  };

  // Filtrado y búsqueda
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clientes.filter((c) => {
      if (filter !== "all" && c.estado !== filter) return false;
      if (!q) return true;
      return (
        c.nombre.toLowerCase().includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.dni && String(c.dni).includes(q))
      );
    });
  }, [clientes, query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(totalPages, p)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar un cliente (optimista y seguro)
  const handleDeleteOne = async (id: string) => {
    const cliente = clientes.find(c => c.id === id);
    const ok = window.confirm(`¿Eliminar a "${cliente?.nombre}" (DNI: ${cliente?.dni})?`);
    if (!ok) return;

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

  // Eliminar todos (secuencial uno por uno)
  

  return (
    <div className=" w-200 !m-6 lg:!m-10 rounded-2xl bg-black/80 !p-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="major-mono-display-regular text-white text-2xl font-bold !mr-4 !mb-3">Lista de Clientes</h1>
            <p className="flex gap-3 text-white">
            <span>Total:{clientes.length}</span>
            <span className="!pl-2">Mostrando:{filtered.length}</span>
            </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 rounded-lg px-3 py-2 gap-2">
            <SearchIcon className="text-gray-300" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Buscar por nombre, email o DNI..."
              className="bg-transparent text-white placeholder-gray-400 outline-none w-72"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value as "all" | "activo" | "inactivo"); setPage(1); }}
            className="bg-white/5 text-white px-3 py-2 rounded-md"
          >
            <option className="!bg-white/10" value="all">Todos</option>
            <option className="bg-white/10" value="activo">Activos</option>
            <option className="bg-white/10" value="inactivo">Inactivos</option>
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
            <div key={i} className="p-4 rounded-lg bg-white/4 border border-white/8 animate-pulse h-28" />
        ))
    ) : pageItems.length === 0 ? (
        <div className="p-6 rounded-lg bg-white/4 border border-white/8 col-span-full text-gray-300">No hay clientes que coincidan.</div>
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

                <div className="mt-3 text-gray-300 text-sm">
                  <div><span className="font-medium text-white mr-2">DNI: </span>{cliente.dni}</div>
                  <div className="mt-1"><span className="font-medium text-white mr-2">Estado: </span>{cliente.estado}</div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex !gap-4 !mt-5  !pr-5">
                  <Button color="danger" size="sm" variant="shadow" className="!p-2" onPress={() => handleDeleteOne(cliente.id)} disabled={working}>
                    <DeleteIcon />Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* paginado */}
      <div className="flex items-center justify-between !mt-4">
        <div className="text-gray-300">
          Página {page} / {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button color="warning" className="px-3 py-1 rounded bg-white/6 text-white" onClick={() => goTo(page - 1)} disabled={page === 1}>Anterior</Button>
          <Button color="secondary" className="px-3 py-1 rounded bg-white/6 text-white" onClick={() => goTo(page + 1)} disabled={page === totalPages}>Siguiente</Button>
        </div>
      </div>
    </div>
  );
};

export default ListaClientes;
