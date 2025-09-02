import React, { createContext, useContext, useState, useEffect } from "react";
import { getPlanes, createPlan, deletePlan, updatePlan} from "../../services/planesService";
import type { Planes } from "../../types/planes";
import { useAuth } from "../clientescontext/useAuth";

interface PlanesContextType {
  planes: Planes[];
  refreshPlanes: () => Promise<void>;
  agregarPlan: (plan: Planes) => Promise<void>;
  eliminarPlan: (id: string) => Promise<void>;
  actualizarPlan: (plan: Planes) => Promise<void>;
  setPlanes: (planes: Planes[]) => void
}

const PlanesContext = createContext<PlanesContextType | undefined>(undefined);

export const PlanesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planes, setPlanes] = useState<Planes[]>([]);
  const {user, loading} = useAuth()

  const refreshPlanes = async () => {
    const data = await getPlanes();
    setPlanes(Array.isArray(data) ? data : []);
  };

  const agregarPlan = async (plan: Planes) => {
    await createPlan(plan);
    await refreshPlanes();
  };

  const eliminarPlan = async (id: string) => {
    await deletePlan(id);
    await refreshPlanes();
  };

  useEffect(() => {
    if (loading) return
    if(!user) return
    refreshPlanes();
  }, [user, loading]);

  const actualizarPlan = async (plan: Planes) => {
    const update = await updatePlan(plan.id, plan)
    setPlanes(prev => prev.map(p => p.id === update.id ? update : p))
    await refreshPlanes() 
  }

  return (
    <PlanesContext.Provider value={{ planes, refreshPlanes, agregarPlan, eliminarPlan, actualizarPlan, setPlanes }}>
      {children}
    </PlanesContext.Provider>
  );
};
// eslint-disable-next-line
export const usePlanes = () => {
  const context = useContext(PlanesContext);
  if (!context) throw new Error("usePlanes debe estar dentro de un PlanesProvider");
  return context;
};
