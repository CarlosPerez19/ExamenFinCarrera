import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import Dashboard from './layout/Dashboard'
import Visualizar from './paginas/Reservas'
import Perfil from './paginas/Perfil'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import Vehiculos from './paginas/Vehiculos'
import Clientes from './paginas/Clientes'
import Reservas from './paginas/Reservas'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<LandinPage />} />

            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
            </Route>

            <Route path='dashboard/*' element={
              <PrivateRoute>
                <Routes>
                  <Route element={<Dashboard />}>
                    <Route index element={<Perfil />} />
                    <Route path='visualizar/:id' element={<Visualizar />} />
                    <Route path='productos' element={<Vehiculos />} />
                    <Route path='clientes' element={<Clientes />} />
                    <Route path='pedidos' element={<Reservas />} />
                  </Route>
                </Routes>
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App