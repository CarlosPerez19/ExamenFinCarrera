import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const DetallePedidos = () => {
    const [codigo, setCodigo] = useState('');
    const [pedido, setPedido] = useState(null);
    const [mensaje, setMensaje] = useState({});

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalleReserva/${codigo}`;
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
            setPedido(respuesta.data);
            setMensaje({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setPedido(null);
        }
    };

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="codigo">Código de la Reserva:</label>
                        <input type="text" id="codigo" name="codigo"
                            value={codigo} onChange={handleChange}
                            placeholder="Ingresa el código de la reserva" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                    </div>
                    <div>
                        <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Buscar</button>
                    </div>
                </form>

                {pedido && (
                    <div className="mt-5">
                        <h2 className="text-2xl font-bold mb-4">Detalles del Pedido</h2>
                        <p><strong>Código:</strong> {pedido.codigo}</p>
                        <p><strong>Descripción:</strong> {pedido.descripcion}</p>
                        <p><strong>Cliente:</strong> {pedido.id_cliente.nombre} {pedido.id_cliente.apellido} ({pedido.id_cliente.email})</p>
                        <h3 className="text-xl font-bold mt-4">Vehículos</h3>
                        <table className="table-auto w-full mt-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Marca</th>
                                    <th className="px-4 py-2">Modelo</th>
                                    <th className="px-4 py-2">Placa</th>
                                    <th className="px-4 py-2">Kilometraje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.id_productos.map((producto, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{producto.marca}</td>
                                        <td className="border px-4 py-2">{producto.modelo}</td>
                                        <td className="border px-4 py-2">{producto.placa}</td>
                                        <td className="border px-4 py-2">{producto.kilometraje}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};