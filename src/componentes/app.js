import { useState } from 'react'
import UserContext from './UseContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaLogin from './telasLoginCadastro/TelaLogin.js'
import TelaCadastro from './telasLoginCadastro/TelaCadastro'
import TelaMovimentacao from './telasMovimentacoes/TelaMovimentacao'
import TelaEntrada from './telasMovimentacoes/TelaEntrada'
import TelaSaida from './telasMovimentacoes/TelaSaida'
import '../estilos/reset.css'
import '../estilos/fontes.css'

export default function App() {
  const [dadosLoginUsuario, setDadosLoginUsuario] = useState({})
  const [movimentacoes, setMovimentacoes] = useState([])

  return (
    <UserContext.Provider
      value={{
        setDadosLoginUsuario,
        dadosLoginUsuario,
        movimentacoes,
        setMovimentacoes
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/movimentacao" element={<TelaMovimentacao />} />
          <Route path="/entrada" element={<TelaEntrada />} />
          <Route path="/saida" element={<TelaSaida />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
