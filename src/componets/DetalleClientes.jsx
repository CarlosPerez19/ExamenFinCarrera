import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';

export const DetalleClientes = () => {
    const [cedula, setCedula] = useState('');
    const [cliente, setCliente] = useState(null);
    const [mensaje, setMensaje] = useState({});

    const handleChange = (e) => {
        setCedula(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/detalleCliente/${cedula}`;
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
            setCliente(respuesta.data);
            setMensaje({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setCliente(null);
        }
    };

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedula">Código del Cliente:</label>
                        <input type="text" id="cedula" name="cedula"
                            value={cedula} onChange={handleChange}
                            placeholder="Ingresa el código del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                    </div>
                    <div>
                        <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Buscar</button>
                    </div>
                </form>

                {cliente && (
                    <div className="mt-5">
                        <h2 className="text-2xl font-bold mb-4">Detalles del Cliente</h2>
                        <p><strong>Cédula:</strong> {cliente.cedula}</p>
                        <p><strong>Nombre:</strong> {cliente.nombre}</p>
                        <p><strong>Apellido:</strong> {cliente.apellido}</p>
                        <p><strong>Email:</strong> {cliente.email}</p>
                        <p><strong>Teléfono:</strong> {cliente.telefono}</p>
                        <p><strong>Dirección:</strong> {cliente.direccion}</p>
                        <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {cliente.fechaNacimiento}</p>
                    </div>
                )}
            </div>
        </>
    );
};