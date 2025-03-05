import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const EliminarPedido = () => {
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState({});

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/eliminarReserva/${codigo}`;
            const token = localStorage.getItem('token');
            if (!token) {
                setMensaje({ respuesta: 'No se encontró el token', tipo: false });
                return;
            }

            const respuesta = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setCodigo('');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
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
                        <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Eliminar</button>
                    </div>
                </form>
            </div>
        </>
    );
};