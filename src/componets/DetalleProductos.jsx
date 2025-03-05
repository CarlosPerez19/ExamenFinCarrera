import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const DetalleProductos = () => {
    const [codigo, setCodigo] = useState('');
    const [producto, setProducto] = useState(null);
    const [mensaje, setMensaje] = useState({});

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalleProducto/${codigo}`;
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
            setProducto(respuesta.data);
            setMensaje({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setProducto(null);
        }
    };

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="codigo">Código del Vehículo:</label>
                        <input type="text" id="codigo" name="codigo"
                            value={codigo} onChange={handleChange}
                            placeholder="Ingresa el código del vehiculo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                    </div>
                    <div>
                        <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Buscar</button>
                    </div>
                </form>

                {producto && (
                    <table className="table-auto w-full mt-5">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Marca</th>
                                <th className="px-4 py-2">Modelo</th>
                                <th className="px-4 py-2">Año de Fabricación</th>
                                <th className="px-4 py-2">Placa</th>
                                <th className="px-4 py-2">Color</th>
                                <th className="px-4 py-2">Tipo de Vehículo</th>
                                <th className="px-4 py-2">Kilometraje</th>
                                <th className="px-4 py-2">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">{producto.marca}</td>
                                <td className="border px-4 py-2">{producto.modelo}</td>
                                <td className="border px-4 py-2">{producto.anio_fabricacion}</td>
                                <td className="border px-4 py-2">{producto.placa}</td>
                                <td className="border px-4 py-2">{producto.color}</td>
                                <td className="border px-4 py-2">{producto.tipo_vehiculo}</td>
                                <td className="border px-4 py-2">{producto.kilometraje}</td>
                                <td className="border px-4 py-2">{producto.descripcion}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};