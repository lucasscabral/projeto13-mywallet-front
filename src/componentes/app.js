import { useState } from 'react'
import UserContext from './UseContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaLogin from './TelaLogin.js'
import TelaCadastro from './TelaCadastro'
import '../estilos/reset.css'
import '../estilos/fontes.css'

export default function App() {
  const [dadosLoginUsuario, setDadosLoginUsuario] = useState({})

  return (
    <UserContext.Provider value={setDadosLoginUsuario}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
