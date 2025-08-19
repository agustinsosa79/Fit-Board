import { HeroUIProvider } from '@heroui/react'
import { AuthProvider } from './context/AuthProvider'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Login } from './pages/Login' 
import { PrivateRoute } from './components/private/PrivateRoute'
import { Dashboard } from './pages/Dashboard'
import { Clientes } from './pages/Clientes'
import { Planes } from './pages/Planes'
import {Layout} from './components/layouts/Layout'
import { Turnos } from './components/turnos/Turnos'
import { Ajustes } from './components/ajustes/Ajustes'
import { ClientesProvider } from './context/ClientesContext'

function App() {



  return (
    <>
    <ClientesProvider>
      <HeroUIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/planes' element={<Planes />} />
                    <Route path='/ajustes' element={<Ajustes />} />
                    <Route path='/turnos' element={<Turnos />} />
                  </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </HeroUIProvider>
    </ClientesProvider>
    </>
  )
}

export default App
