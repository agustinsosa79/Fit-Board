import { HeroUIProvider } from '@heroui/react'
import { AuthProvider } from './context/AuthProvider'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router' 
import { Login } from './pages/Login' 
import { PrivateRoute } from './components/PrivateRoute'
import { Dashboard } from './pages/Dashboard'
import { Clientes } from './pages/Clientes'
import { Planes } from './pages/Planes'

function App() {



  return (
    <>
      <HeroUIProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path='/' element={<Dashboard />} />
                <Route path='/clientes' element={<Clientes />} />
                <Route path='/planes' element={<Planes />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </HeroUIProvider>
    </>
  )
}

export default App
