import type { Planes } from "../types/planes";
const API_URL = import.meta.env.VITE_API_URL;

export const getPlanes = async (): Promise<Planes[]> => {
  const response = await fetch(`${API_URL}/api/planes`, {
    credentials: "include"
  });
  if (!response.ok) throw new Error("Error al obtener los planes");
  return response.json();
};


export const createPlan = async (plan: Planes): Promise<Planes> => {
  const response = await fetch(`${API_URL}/api/planes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plan),
    credentials: "include"
  });
  if (!response.ok) throw new Error("Error al crear el plan");
  return response.json();
};

export const deletePlan = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/planes/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) throw new Error("Error al eliminar el plan");
};

export const updatePlan = async (id: string, plan: Planes): Promise<Planes> => {
  const response = await fetch(`${API_URL}/api/planes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plan),
    credentials: "include"
  });
  if (!response.ok) throw new Error("Error al actualizar el plan");
  return response.json();
};
