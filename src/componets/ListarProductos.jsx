import { useState, useEffect } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const ListarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/listarVehiculo`;
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
                setProductos(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };

        obtenerProductos();
    }, []);

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Marca</th>
                            <th className="px-4 py-2">Modelo</th>
                            <th className="px-4 py-2">Año de Fabricación</th>
                            <th className="px-4 py-2">Placa</th>
                            <th className="px-4 py-2">color</th>
                            <th className="px-4 py-2">Tipo de Vehiculo</th>
                            <th className="px-4 py-2">Kilometraje</th>
                            <th className="px-4 py-2">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto._id}>
                                <td className="border px-4 py-2">{producto.marca}</td>
                                <td className="border px-4 py-2">{producto.modelo}</td>
                                <td className="border px-4 py-2">{producto.anio_fabrication}</td>
                                <td className="border px-4 py-2">{producto.placa}</td>
                                <td className="border px-4 py-2">{producto.color}</td>
                                <td className="border px-4 py-2">{producto.tipo_vehiculo}</td>
                                <td className="border px-4 py-2">{producto.kilometraje}</td>
                                <td className="border px-4 py-2">{producto.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};