import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const CrearProducto = () => {

    // paso 1 
    const [form, setform] = useState({
        
        marca: '',
        modelo: '',
        anio_fabrication: '',
        placa: '',
        color: '',
        tipo_vehiculo: '',
        kilometraje: '',
        descripcion: ''

    })
    
    // paso 2
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    // paso 3

    const [mensaje, setMensaje] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const url =  `${import.meta.env.VITE_BACKEND_URL}/crearVehiculo`;
            const token = localStorage.getItem('token'); 
            if (!token) {
                setMensaje({ respuesta: 'No se encontró el token', tipo: false });
                return;
            }

            // Formatear la fecha a YYYY-MM-DD
            const formatearFecha = (fecha) => {
                const date = new Date(fecha);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formConFechaFormateada = {
                ...form,
                anio_fabrication: formatearFecha(form.anio_fabrication)

               
                
            };
            
            console.log(formConFechaFormateada);

            const respuesta = await axios.post(url, formConFechaFormateada, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({
                marca: '',
                modelo: '',
                anio_fabrication: '',
                placa: '',
                color: '',
                tipo_vehiculo: '',
                kilometraje: '',
                descripcion: ''
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
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="marca">Marca:</label>
                            <input type="text" id="marca" name='marca'
                                value={form.marca} onChange={handleChange}
                                placeholder="Ingresa la marca del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="modelo">Modelo:</label>
                            <input type="text" id="modelo" name='modelo'
                                value={form.modelo} onChange={handleChange}
                                placeholder="Ingresa el modelo del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="anio_fabrication">Año de Fabricación:</label>
                            <input type="date" id="anio_fabrication" name='anio_fabrication'
                                value={form.anio_fabricacion} onChange={handleChange}
                                placeholder="Ingresa el año de fabricación del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="placa">Placa:</label>
                            <input type="text" id="placa" name='placa'
                                value={form.placa} onChange={handleChange}
                                placeholder="Ingresa la placa del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="color">Color:</label>
                            <input type="text" id="color" name='color'
                                value={form.color} onChange={handleChange}
                                placeholder="Ingresa el color del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="tipo_vehiculo">Tipo de Vehículo:</label>
                            <input type="text" id="tipo_vehiculo" name='tipo_vehiculo'
                                value={form.tipo_vehiculo} onChange={handleChange}
                                placeholder="Ingresa el tipo de vehiculo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="kilometraje">Kilometraje:</label>
                            <input type="number" id="kilometraje" name='kilometraje'
                                value={form.kilometraje} onChange={handleChange}
                                placeholder="Ingresa el kilometraje del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="descripcion">Descripción:</label>
                            <input type="text" id="descripcion" name='descripcion'
                                value={form.descripcion} onChange={handleChange}
                                placeholder="Ingresa la descripcion del Vehículo" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <button className=" bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-al mt-4">Registrar</button>
                        </div>


                    </form>

                </div>

            </div>

        </>
    )
}