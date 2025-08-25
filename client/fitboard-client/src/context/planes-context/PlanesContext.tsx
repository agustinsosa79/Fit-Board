import React, { createContext, useContext, useState, useEffect } from "react";
import { getPlanes, createPlan, deletePlan} from "../../services/planesService";
import type { Planes } from "../../types/planes";

interface PlanesContextType {
  planes: Planes[];
  refreshPlanes: () => Promise<void>;
  agregarPlan: (plan: Planes) => Promise<void>;
  eliminarPlan: (id: string) => Promise<void>;
}

const PlanesContext = createContext<PlanesContextType | undefined>(undefined);

export const PlanesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [planes, setPlanes] = useState<Planes[]>([]);

  const refreshPlanes = async () => {
    const data = await getPlanes();
    setPlanes(data);
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
    refreshPlanes();
  }, []);

  return (
    <PlanesContext.Provider value={{ planes, refreshPlanes, agregarPlan, eliminarPlan }}>
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
