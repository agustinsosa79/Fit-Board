import { useState } from 'react'
import { type Cliente } from '../../../types/clientes';
import { createCliente } from '../../../services/clientesService';

interface ClientesFormProps {
    onClienteCreado: (cliente: Cliente) => void;
}

export const ClientForm = ({ onClienteCreado }: ClientesFormProps) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nuevoCliente: Cliente = { id: Date.now(), nombre, email, dni: '', estado: 'activo' };
        const clienteCreado = await createCliente(nuevoCliente);
        onClienteCreado(clienteCreado);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button type="submit">Crear Cliente</button>
        </form>
    );
};