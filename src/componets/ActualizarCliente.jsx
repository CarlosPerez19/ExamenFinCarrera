import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const ActualizarCliente = () => {

    const [cedula, setCedula] = useState('');
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        fechaNacimiento: ''
    });
    const [mensaje, setMensaje] = useState({});
    const [clienteEncontrado, setClienteEncontrado] = useState(false);

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleBuscarCliente = async (e) => {
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
            setForm(respuesta.data);
            setClienteEncontrado(true);
            setMensaje({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setClienteEncontrado(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarCliente/${cedula}`;
            const token = localStorage.getItem('token'); 
            if (!token) {
                setMensaje({ respuesta: 'No se encontró el token', tipo: false });
                return;
            }

            const respuesta = await axios.put(url, form, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                direccion: '',
                ciudad: '',
                fechaNacimiento: ''
            });
            setClienteEncontrado(false);
            setCedula('');
          } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
          }
      };

    return (
        <>
            <div>
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                {!clienteEncontrado ? (
                    <form onSubmit={handleBuscarCliente}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedula">Código del Cliente:</label>
                            <input type="text" id="cedula" name="cedula"
                                value={cedula} onChange={handleCedulaChange}
                                placeholder="Ingresa el código del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>
                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Buscar</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre} onChange={handleChange}
                                placeholder="Ingresa el nombre del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido} onChange={handleChange}
                                placeholder="Ingresa el apellido del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="email">Email:</label>
                            <input type="email" id="email" name='email'
                                value={form.email} onChange={handleChange}
                                placeholder="Ingresa el email del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="telefono">Teléfono:</label>
                            <input type="text" id="telefono" name='telefono'
                                value={form.telefono} onChange={handleChange}
                                placeholder="Ingresa el teléfono del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="direccion">Dirección:</label>
                            <input type="text" id="direccion" name='direccion'
                                value={form.direccion} onChange={handleChange}
                                placeholder="Ingresa la dirección del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="ciudad">Ciudad:</label>
                            <input type="text" id="ciudad" name='ciudad'
                                value={form.ciudad} onChange={handleChange}
                                placeholder="Ingresa la ciudad del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                            <input type="date" id="fechaNacimiento" name='fechaNacimiento'
                                value={form.fechaNacimiento} onChange={handleChange}
                                placeholder="Ingresa la fecha de nacimiento del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Actualizar</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}