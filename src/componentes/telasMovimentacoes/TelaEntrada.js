import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import UserContext from '../UseContext'

export default function TelaEntrada() {
  const { dadosLoginUsuario, setMovimentacoes } = useContext(UserContext)
  const [valor, setValor] = useState()
  const [descricao, setDescricao] = useState('')
  const navigate = useNavigate()

  function submitEntrada(event) {
    event.preventDefault()
    const dadosEntrada = {
      valor,
      descricao
    }

    const URL = 'https://mywallets.herokuapp.com/entrada'
    const promise = axios.post(URL, dadosEntrada, {
      headers: {
        Authorization: `Bearer ${dadosLoginUsuario.token}`
      }
    })
    promise
      .then(response => {
        setMovimentacoes([...response.data])
        navigate('/movimentacao')
      })
      .catch(error => {
        alert(error.response.data)
      })
  }

  return (
    <Conteudo>
      <h1>Nova entrada</h1>
      <FormEntrada onSubmit={submitEntrada}>
        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Salvar entrada</button>
      </FormEntrada>
    </Conteudo>
  )
}

const Conteudo = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8c11be;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif;
  padding: 30px 30px;
  h1 {
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
  }
`
const FormEntrada = styled.form`
  width: 100%;
  margin-top: 50px;
  display: block;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    height: 58px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #d5d5d5;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20px;
  }
  button {
    font-family: 'Lexend Deca', sans-serif;
    width: 100%;
    height: 46px;
    background-color: #a328d6;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-weight: 700;
    font-size: 20px;
    cursor: pointer;
  }
`
