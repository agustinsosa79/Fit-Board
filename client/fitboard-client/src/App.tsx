import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { AuthProvider } from './context/clientescontext/AuthProvider'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { Login } from './pages/Login' 
import { PrivateRoute } from './components/private/PrivateRoute'
import { Dashboard } from './pages/Dashboard'
import { Clientes } from './pages/Clientes'
import { Planes } from './pages/Planes'
import {Layout} from './components/layouts/Layout'
import { ClientesProvider } from './context/clientescontext/ClientesContext'
import { PlanesProvider } from './context/planescontext/PlanesContext'

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
