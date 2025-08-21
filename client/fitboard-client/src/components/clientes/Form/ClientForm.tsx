import { useState } from 'react'
import { type Cliente } from '../../../types/clientes';
import { createCliente } from '../../../services/clientesService';
import { useClients } from '../../../context/ClientesContext';
import { Form, Input, Button, Alert } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';

export const ClientForm = () => {
    const { agregarCliente } = useClients();
   const [error, setError] = useState<{ nombre?: string; email?: string; dni?: string; telefono?: string, edad?: string, direccion?: string }>({});
   const [clienteAgregado, setClienteAgregado] = useState(false);



    const [form, setForm] = useState({ nombre: '', edad: '', email: '', dni: '', telefono: '', direccion: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({});

        const nuevoCliente: Cliente = { id: crypto.randomUUID(), ...form, estado: 'activo' };
        const errores: typeof error = {};
if (!form.nombre) errores.nombre = "Nombre es obligatorio";
else if (form.nombre.length < 3) errores.nombre = "El nombre debe tener al menos 3 caracteres";
else if (form.nombre.length > 20) errores.nombre = "El nombre debe tener como máximo 20 caracteres";

if (!form.email) errores.email = "Email es obligatorio";
else if (!/\S+@\S+\.\S+/.test(form.email)) errores.email = "Email no válido";

if (!form.dni) errores.dni = "DNI es obligatorio";
else if (form.dni.length < 8) errores.dni = "DNI debe tener al menos 8 caracteres";

// si hay errores, los mostramos y detenemos la ejecución
if (Object.keys(errores).length > 0) {
    setError(errores);
    setTimeout(() => setError({}), 5000);
    return;
}
        try {
            const clienteCreado = await createCliente(nuevoCliente);
            agregarCliente(clienteCreado);
            setForm({ nombre: "", edad: "", email: "", dni: "", telefono: "", direccion: "" });
            setClienteAgregado(true);
            setTimeout(() => {
                setClienteAgregado(false);
            }, 5000);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error({message: error.message});
            } else {
                console.error({message: "Error desconocido"});
            }
        }
    };

    return (
        <Form validationErrors={error}  onSubmit={handleSubmit} className='lg:bg-black/80 rounded-2xl w-135 h-auto !flex !flex-col !gap-12 !major-mono-display-regular !m-10 !p-18'>
            <h1 className='!major-mono-display-regular text-white !ml-19 major-mono-display-regular text-2xl font-bold'>Crear Cliente</h1>
            <Input
                name='nombre'
                isRequired
                label="Nombre completo"
                labelPlacement='outside'
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre"
                variant='flat'
                //@ts-expect-error-ignore
                color='undefined' 
                radius='sm'
                size='md'
                className=' !text-black !font-bold caret-blue-400  lg:!major-mono-display-regular'
            />
        <Input
            name='edad'
            isRequired
            label="Edad"
            labelPlacement='outside'
            type="number"
            value={form.edad}
            onChange={(e) => setForm({ ...form, edad: e.target.value })}
            placeholder="Edad"
            variant='flat'
            errorMessage={error.edad}
            //@ts-expect-error-ignore
            color='undefined'
            size='md'
            radius='sm'
            className=' !text-black caret-blue-400 !font-bold !major-mono-display-regular'
        />
            <Input
                name='email'
                isRequired
                label="Email"
                labelPlacement='outside'
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                variant='flat'
                errorMessage={error.email}
                //@ts-expect-error-ignore
                color='undefined'
                size='md'
                radius='sm'
                className=' !text-black caret-blue-400 !font-bold !major-mono-display-regular'
                />
            <Input
                radius='sm'
                name='dni'
                isRequired
                errorMessage={error.dni}
                label="DNI"
                labelPlacement='outside'
                type="text"
                value={form.dni}
                onChange={(e) => setForm({ ...form, dni: e.target.value })}
                placeholder="DNI"
                variant='flat'
                size='md'
                //@ts-expect-error-ignore
                color='undefined'
                className=' !text-black caret-blue-400 !font-bold'
                />
                <Input
                radius='sm'
                name='telefono'
                isRequired
                label="Teléfono"
                labelPlacement='outside'
                type="text"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                placeholder="Teléfono"
                variant='flat'
                size='md'
                //@ts-expect-error-ignore
                color='undefined'
                className=' !text-black caret-blue-400 !font-bold'
                />
                <Input
                    radius='sm'
                    name='direccion'
                    isRequired
                    label="Dirección"
                    labelPlacement='outside'
                    type="text"
                    value={form.direccion}
                    onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                    placeholder="Dirección"
                    variant='flat'
                    size='md'
                    //@ts-expect-error-ignore
                    color='undefined'
                    className=' !text-black caret-blue-400 !font-bold'
                />
                <div className='flex justify-center'>
            <Button type='submit' variant="shadow" color="success" className='font-semibold text-white !p-3 !mr-2'>Agregar Cliente</Button>
            <Button onClick={() => setForm({ nombre: "", edad: "", email: "", dni: "", telefono: "", direccion: "" })} type="reset" variant="shadow" color='secondary' className='font-semibold !mr-5'>Resetear</Button>
                <AnimatePresence>

                {clienteAgregado && <motion.div
                initial={{ opacity: 0, y: -10 }} // empieza invisible y un poco arriba
                animate={{ opacity: 1, y: 0 }}   // aparece
                exit={{ opacity: 0, y: -10 }}    // desaparece
                transition={{ duration: 0.3 }}
                >
                    <Alert className=' !m-0 !pr-4 flex text-green-950' color='success' title='Cliente agregado!' variant='solid' />
                </motion.div>}
                    </AnimatePresence>
                </div>
        </Form>
    );
};