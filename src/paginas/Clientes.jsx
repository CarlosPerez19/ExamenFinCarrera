import React, { useState } from 'react';
import { CrearCliente } from '../componets/CrearClientes';
import { ListarClientes } from '../componets/ListarClientes';
import { DetalleClientes } from '../componets/DetalleClientes';
import { ActualizarCliente } from '../componets/ActualizarCliente';
import { EliminarCliente } from '../componets/EliminarClientes';

const RegistrarProfesor = () => {
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarListar, setMostrarListar] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Clientes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite gestionar clientes</p>

            <div>
                <button onClick={() => setMostrarCrear(!mostrarCrear)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarCrear ? 'Ocultar Crear Cliente' : 'Mostrar Crear Cliente'}
                </button>
                {mostrarCrear && <CrearCliente />}
            </div>

            <div>
                <button onClick={() => setMostrarListar(!mostrarListar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarListar ? 'Ocultar Listar Clientes' : 'Mostrar Listar Clientes'}
                </button>
                {mostrarListar && <ListarClientes />}
            </div>

            <div>
                <button onClick={() => setMostrarDetalle(!mostrarDetalle)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarDetalle ? 'Ocultar Detalle Cliente' : 'Mostrar Detalle Cliente'}
                </button>
                {mostrarDetalle && <DetalleClientes />}
            </div>

            <div>
                <button onClick={() => setMostrarActualizar(!mostrarActualizar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarActualizar ? 'Ocultar Actualizar Cliente' : 'Mostrar Actualizar Cliente'}
                </button>
                {mostrarActualizar && <ActualizarCliente />}
            </div>

            <div>
                <button onClick={() => setMostrarEliminar(!mostrarEliminar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarEliminar ? 'Ocultar Eliminar Cliente' : 'Mostrar Eliminar Cliente'}
                </button>
                {mostrarEliminar && <EliminarCliente />}
            </div>
        </div>
    );
}

export default RegistrarProfesor;