import React from 'react';
import { CardPerfil } from '../componets/Perfil/CardPerfil';


import { CardPerfilAdmin } from '../componets/Perfil/CardPerfilAdmin';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';


import { Disclosure } from '@headlessui/react';

const Perfil = () => {
    
    const { auth } = useContext(AuthContext);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite visualizar el perfil del usuario</p>
            </div>

            {
                "administrador" in auth 
                    ? (<CardPerfilAdmin/>)
                    : (
                        <div className='flex flex-col gap-y-8'>
                            <div className='w-full'>
                                <CardPerfil/>
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default Perfil;