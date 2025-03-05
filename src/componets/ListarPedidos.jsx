import { useState, useEffect } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const ListarPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/listarReserva`;
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
                setPedidos(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };

        obtenerPedidos();
    }, []);

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <table className="table-auto w-full mt-5">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Código</th>
                            <th className="px-4 py-2">Descripción</th>
                            <th className="px-4 py-2">Cliente</th>
                            <th className="px-4 py-2">Vehículos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido._id}>
                                <td className="border px-4 py-2">{pedido.codigo}</td>
                                <td className="border px-4 py-2">{pedido.descripcion}</td>
                                <td className="border px-4 py-2">{pedido.id_cliente.nombre} {pedido.id_cliente.apellido} ({pedido.id_cliente.email})</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {pedido.id_vehiculo.map((producto, index) => (
                                            <li key={index}>
                                                {producto.marca} - {producto.modelo} - {producto.placa} - {producto.kilometraje}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};