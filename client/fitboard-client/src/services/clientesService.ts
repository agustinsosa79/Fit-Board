import { type Cliente } from "../types/clientes"

export const fetchClientes = async (): Promise<Cliente[]> => {
    try {
        const response = await fetch("http://localhost:3000/api/clientes", {
            credentials: "include"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching clientes:", error);
        throw error;
    }
}



export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
    try {
        const response = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente),
            credentials: "include"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating cliente:", error);
        throw error;
    }
}

export const deleteCliente = async (id: string)  => {
  try {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    return true;
  } catch (error) {
    console.error("Error deleting cliente (service):", error);
    throw error;
  }
}


export const updateCliente = async (id: string, cliente: Cliente): Promise<Cliente> => {
  try {
    const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente),
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cliente:", error);
    throw error;
  }
};
