import { useState, useEffect } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const ListarClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/listarClientes`;
                const token = localStorage.getItem('token');
                if (!token) {
                    setMensaje({ respuesta: 'No se encontró el token', tipo: false });
                    return;
                }

                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setClientes(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };

        obtenerClientes();
    }, []);

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Cédula</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Teléfono</th>
                            <th className="px-4 py-2">Dirección</th>
                            <th className="px-4 py-2">Ciudad</th>
                            <th className="px-4 py-2">Fecha de Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente._id}>
                                <td className="border px-4 py-2">{cliente.cedula}</td>
                                <td className="border px-4 py-2">{cliente.nombre}</td>
                                <td className="border px-4 py-2">{cliente.apellido}</td>
                                <td className="border px-4 py-2">{cliente.email}</td>
                                <td className="border px-4 py-2">{cliente.telefono}</td>
                                <td className="border px-4 py-2">{cliente.direccion}</td>
                                <td className="border px-4 py-2">{cliente.ciudad}</td>
                                <td className="border px-4 py-2">{cliente.fechaNacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};