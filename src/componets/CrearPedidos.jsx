import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const CrearPedido = () => {

    // paso 1 
    const [form, setform] = useState({
        codigo: '',
        descripcion: '',
        id_cliente: '',
        id_vehiculos: ['']
    })
    
    // paso 2
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const handleProductoChange = (index, e) => {
        const nuevosProductos = [...form.id_vehiculos];
        nuevosProductos[index] = e.target.value;
        setform({
            ...form,
            id_vehiculos: nuevosProductos
        });
    }

    const agregarProducto = () => {
        setform({
            ...form,
            id_vehiculos: [...form.id_vehiculos, '']
        });
    }

    const eliminarProducto = (index) => {
        const nuevosProductos = form.id_vehiculos.filter((_, i) => i !== index);
        setform({
            ...form,
            id_vehiculos: nuevosProductos
        });
    }

    // paso 3

    const [mensaje, setMensaje] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url =  `${import.meta.env.VITE_BACKEND_URL}/crearPedido`;
            const token = localStorage.getItem('token'); 
            if (!token) {
                setMensaje({ respuesta: 'No se encontró el token', tipo: false });
                return;
            }

            const respuesta = await axios.post(url, form, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({
                codigo: '',
                descripcion: '',
                id_cliente: '',
                id_vehiculos: ['']
            });
          } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
          }
      };


      return (
        <>
            <div>

                <div>
                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
              
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="codigo">Codigo:</label>
                            <input type="text" id="codigo" name='codigo'
                                value={form.codigo} onChange={handleChange}
                                placeholder="Ingresa el codigo de la reserva" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">Descripcion:</label>
                            <input type="text" id="descripcion" name='descripcion'
                                value={form.descripcion} onChange={handleChange}
                                placeholder="Ingresa la descripcion de la reserva" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="id_cliente">Codigo Cliente:</label>
                            <input type="text" id="id_cliente" name='id_cliente'
                                value={form.id_cliente} onChange={handleChange}
                                placeholder="Ingresa el codigo del cliente" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        {form.id_productos.map((producto, index) => (
                            <div key={index}>
                                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor={`producto-${index}`}>Codigo Vehículo {index + 1}:</label>
                                <input type="text" id={`producto-${index}`} name={`producto-${index}`}
                                    value={producto} onChange={(e) => handleProductoChange(index, e)}
                                    placeholder="Ingresa el codigo del vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                                <button type="button" onClick={() => eliminarProducto(index)} className="bg-red-600 text-white p-2 rounded-md">Eliminar</button>
                            </div>
                        ))}

                        <div>
                            <button type="button" onClick={agregarProducto} className="bg-blue-600 text-white p-2 rounded-md">Agregar Producto</button>
                        </div>

                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">Registrar</button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    )
}