import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { AuthProvider } from './context/clientes-context/AuthProvider'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Login } from './pages/Login' 
import { PrivateRoute } from './components/private/PrivateRoute'
import { Dashboard } from './pages/Dashboard'
import { Clientes } from './pages/Clientes'
import { Planes } from './pages/Planes'
import {Layout} from './components/layouts/Layout'
import { Ajustes } from './components/ajustes/Ajustes'
import { ClientesProvider } from './context/clientes-context/ClientesContext'
import { PlanesProvider } from './context/planes-context/PlanesContext'

function App() {



  return (
    <>
    <AuthProvider>
      <ClientesProvider>
        <PlanesProvider>
            <ToastProvider placement='bottom-right' maxVisibleToasts={1} />
          <HeroUIProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/clientes' element={<Clientes />} />
                    <Route path='/planes' element={<Planes />} />
                    <Route path='/ajustes' element={<Ajustes />} />
                  </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </HeroUIProvider>
        </PlanesProvider>
      </ClientesProvider>
    </AuthProvider>
    </>
  )
}

export default App
