import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthProvider'
import Mensaje from '../componets/Alertas/Mensajes'

const Login = () => {
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()
    const { setAuth, setEstado } = useContext(AuthContext)

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}/login`
        try {
            const respuesta = await axios.post(url, form)
            localStorage.setItem('token', respuesta.data.token)
            setAuth(respuesta.data)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response.data.msg)
            setform({})
            setTimeout(() => {
                setMensaje({})
            }, 5000);
        }
    }

    return (
        <>
            <ToastContainer />
  

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">Bienvenido!</h1>
                    <small className="text-gray-400 block my-4 text-sm">Welcome back! Please enter your details</small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input type="email" placeholder="Enter you email"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input type="password" placeholder="********************"
                                name='password'
                                value={form.password || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>

                    </form>


                </div>
            </div>
        </>
    )
}

export default Login