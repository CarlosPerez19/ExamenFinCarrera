import React, { useState } from 'react';
import { CrearPedido } from '../componets/CrearPedidos';
import { ListarPedidos } from '../componets/ListarPedidos';
import { DetallePedidos } from '../componets/DetallePedidos';
import { ActualizarPedidos } from '../componets/ActualizarPedido';
import { EliminarPedido } from '../componets/EliminarPedido';

const Pedidos = () => {
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarListar, setMostrarListar] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarActualizar, setMostrarActualizar] = useState(false);
    const [mostrarEliminar, setMostrarEliminar] = useState(false);

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Reservas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite gestionar los vehículos</p>

            <div>
                <button onClick={() => setMostrarCrear(!mostrarCrear)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarCrear ? 'Ocultar Crear Pedido' : 'Mostrar Crear Pedido'}
                </button>
                {mostrarCrear && <CrearPedido />}
            </div>

            <div>
                <button onClick={() => setMostrarListar(!mostrarListar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarListar ? 'Ocultar Listar Pedidos' : 'Mostrar Listar Pedidos'}
                </button>
                {mostrarListar && <ListarPedidos />}
            </div>

            <div>
                <button onClick={() => setMostrarDetalle(!mostrarDetalle)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarDetalle ? 'Ocultar Detalle Pedido' : 'Mostrar Detalle Pedido'}
                </button>
                {mostrarDetalle && <DetallePedidos />}
            </div>

            <div>
                <button onClick={() => setMostrarActualizar(!mostrarActualizar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarActualizar ? 'Ocultar Actualizar Pedido' : 'Mostrar Actualizar Pedido'}
                </button>
                {mostrarActualizar && <ActualizarPedidos />}
            </div>

            <div>
                <button onClick={() => setMostrarEliminar(!mostrarEliminar)} className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                    {mostrarEliminar ? 'Ocultar Eliminar Pedido' : 'Mostrar Eliminar Pedido'}
                </button>
                {mostrarEliminar && <EliminarPedido />}
            </div>
        </div>
    );
}

export default Pedidos;