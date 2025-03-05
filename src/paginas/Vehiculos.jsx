import React, { useState } from 'react';
import { CrearProducto } from '../componets/CrearProducto';
import { ListarProductos } from '../componets/ListarProductos';
import { DetalleProductos } from '../componets/DetalleProductos';
import { ActualizarProductos } from '../componets/ActualizarProducto';
import { EliminarProductos } from '../componets/EliminarProductos';

const Productos = () => {
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarListar, setMostrarListar] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Vehículos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite gestionar vehículos</p>

            <div>
                <button onClick={() => setMostrarCrear(!mostrarCrear)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarCrear ? 'Ocultar Crear Producto' : 'Mostrar Crear Producto'}
                </button>
                {mostrarCrear && <CrearProducto />}
            </div>

            <div>
                <button onClick={() => setMostrarListar(!mostrarListar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarListar ? 'Ocultar Listar Productos' : 'Mostrar Listar Productos'}
                </button>
                {mostrarListar && <ListarProductos />}
            </div>

            <div>
                <button onClick={() => setMostrarDetalle(!mostrarDetalle)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarDetalle ? 'Ocultar Detalle Producto' : 'Mostrar Detalle Producto'}
                </button>
                {mostrarDetalle && <DetalleProductos />}
            </div>

            <div>
                <button onClick={() => setMostrarActualizar(!mostrarActualizar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarActualizar ? 'Ocultar Actualizar Producto' : 'Mostrar Actualizar Producto'}
                </button>
                {mostrarActualizar && <ActualizarProductos />}
            </div>

            <div>
                <button onClick={() => setMostrarEliminar(!mostrarEliminar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarEliminar ? 'Ocultar Eliminar Producto' : 'Mostrar Eliminar Producto'}
                </button>
                {mostrarEliminar && <EliminarProductos />}
            </div>
        </div>
    );
}

export default Productos;