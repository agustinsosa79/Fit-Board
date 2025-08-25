import { useState } from "react";
import type { Planes } from "../../../types/planes";
import { usePlanes } from "../../../context/planes-context/PlanesContext";
import { Button, Form, Input } from "@heroui/react";



export const PlanesForm = () => {
    const { agregarPlan } = usePlanes(); // Assuming usePlanes provides agregarPlan function
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        duracion: "",
    });
    const [errors, setErrors] = useState<{
        nombre?: string;
        descripcion?: string;
        precio?: string;
        duracion?: string;
    }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

         if (name === "duracion") {
    if (/^\d*$/.test(value)) { // solo números
      if (Number(value) <= 12) {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, duracion: "" })); // borrar error si es válido
      } else {
        setErrors((prev) => ({ ...prev, duracion: "Solo se permiten hasta 12 meses" }));
      }
    }
    return;
  }

  if (name === "precio") {
    if (/^\d*$/.test(value)) {
      if (Number(value) <= 1000000) {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, precio: "" }));
      } else {
        setErrors((prev) => ({ ...prev, precio: "Solo se permiten hasta 1.000.000 pesos" }));
      }
    }
    return;
  }
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const precioNum = Number(form.precio);
    const duracionNum = Number(form.duracion);

    if(
        form.nombre.trim() === "" ||
        form.descripcion.trim() === "" ||
        isNaN(precioNum) || precioNum <= 0 ||
        isNaN(duracionNum) || duracionNum <= 0
    ) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    try {
        await agregarPlan({
            ...form,
            precio: precioNum,
            duracion: duracionNum,
        } as Planes);

        setForm({
            nombre: "",
            descripcion: "",
            precio: "",
            duracion: "",
        });
    } catch (error) {
        console.log(error);
    }
};


    return (
        <Form onSubmit={handleSubmit} className="!w-100 !flex !flex-column !gap-20 !p-10 !m-15">
                <Input
                radius='sm'
                name='nombre'
                isRequired
                label="Nombre del plan"
                labelPlacement='outside'
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre"
                variant='flat'
                size='md'
                //@ts-expect-error-ignore
                color='undefined'
                className=' caret-blue-400 !font-bold'
                
                />
                <Input
                    radius="sm"
                    name="descripcion"
                    isRequired
                    label="Descripción"
                    labelPlacement="outside"
                    type="text"
                    id="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    variant="flat"
                    size="md"
                    //@ts-expect-error-ignore
                    color="undefined"
                    className="caret-blue-400 !font-bold"
                />
                    <Input
                    radius="sm"
                    name="precio"
                    isRequired
                    type="text"
                    labelPlacement="outside"
                    id="precio"
                    value={
                        form.precio
                        ? new Intl.NumberFormat("es-AR").format(Number(form.precio))
                        : ""
                        }
                        onChange={(e) => {
                        const raw = e.target.value.replace(/\./g, "");
                        if (/^\d*$/.test(raw) && Number(raw) <= 1000000) {
                        setForm((prev) => ({ ...prev, precio: raw }));
                        setErrors((prev) => ({ ...prev, precio: "" }));
                        } else if (Number(raw) > 1000000) {
                        setErrors((prev) => ({ ...prev, precio: "Solo hasta 1.000.000" }));
                    }
                    }}
                    label="Precio"
                    variant="flat"
                    placeholder="Precio"
                    size="md"
                    //@ts-expect-error-ignore
                    color="undefined"
                    errorMessage={errors.precio}
                    className="caret-blue-400 !font-bold text-bold"
                    />
                <Input
                    radius="sm"
                    isRequired
                    label="Duración"
                    labelPlacement="outside"
                    type="number"
                    id="duracion"
                    name="duracion"
                    value={form.duracion.toString()}
                    onChange={handleChange}
                    placeholder="Maximo 12 meses"
                    variant="flat"
                    size="md"
                    //@ts-expect-error-ignore
                    color="undefined"
                    className="caret-blue-400 !font-bold"
                    errorMessage={errors.duracion}
                />
            <Button color="success" variant="shadow" size="md" radius="md" type="submit" className="!text-white !font-bold !p-0 w-80">Guardar</Button>
        </Form>
    );
};
