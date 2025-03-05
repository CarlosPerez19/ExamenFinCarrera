import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logoDarkMode from '../assets/dark.png'
import descubrir1 from '/public/images/descubrir.jpg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import descubrir2 from '/public/images/descubrir2.jpg'
import descubrir3 from '/public/images/descubrir3.jpg'
import nissan from '../../public/images/nissan.webp'
import mazda from '../../public/images/mazda.avif'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>Vehiculos Bien Chetos</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={() => setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40} /></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Vehiculos</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>¡Comprar tu Vehiculo hoy!</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>Carritos Bien Pros Bro</p>
                    </div>    

                </section>

                <section>
                <Slider {...settings}>
                        <div className="p-4">
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                                <img src={nissan} alt="Project 1" className="w-full h-90 object-cover rounded-lg" />
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                                <img src={mazda} alt="Project 2" className="w-full h-90 object-cover rounded-lg" />
                            </div>
                        </div>
                    </Slider>

                    <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <h3 className='text-lg font-medium pt-8 pb-2'>Mision</h3>
                            <p className='py-4 text-teal-600'>
                                Carritos God
                            </p>

                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-300'>
                            <h3 className='text-lg font-medium pt-8 pb-2'>Vision</h3>
                            <p className='py-4 text-teal-600'>
                                Bien rapidos
                            </p>
 
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}