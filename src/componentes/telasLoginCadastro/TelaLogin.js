import { useState, useContext } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ThreeDots } from 'react-loader-spinner'
import UserContext from '../UseContext'

export default function TelaLogin() {
  const { setDadosLoginUsuario } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [able, setAble] = useState(true)

  function logarUser(event) {
    event.preventDefault()
    setAble(false)
    if ((email || password) !== null) {
      const corpoForm = {
        email,
        password
      }

      const URL = 'http://localhost:5000/login'
      const promise = axios.post(URL, corpoForm)
      promise
        .then(response => {
          // DAQUI ELE VAI PARA A TELA DE MOVIMENTAÇÕES
          setDadosLoginUsuario({ ...response.data })
          navigate('/movimentacao')
        })
        .catch(err => {
          alert(err.response.data)
          setAble(true)
        })
    } else {
      alert('Todos os campos são obrigatórios')
      return
    }
  }
  return (
    <ConteudoLogin>
      <h1>MyWallet</h1>
      {able ? (
        <FormLogin onSubmit={logarUser}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </FormLogin>
      ) : (
        <FormLogin>
          <input type="email" placeholder="E-mail" disabled required />
          <input type="password" placeholder="senha" disabled required />
          <div>
            <ThreeDots color="white" />
          </div>
        </FormLogin>
      )}
      {able ? (
        <Link to="/cadastro" style={{ textDecoration: 'none' }}>
          <span>Primeira vez? Cadastre-se!</span>
        </Link>
      ) : (
        <Link to="" style={{ textDecoration: 'none' }}>
          <span>Primeira vez? Cadastre-se!</span>
        </Link>
      )}
    </ConteudoLogin>
  )
}

const ConteudoLogin = styled.div`
  background-color: #a328d6;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-left: 25px;
  padding-right: 25px;
  font-family: 'Lexend Deca', sans-serif;
  h1 {
    font-family: 'Black Ops One', cursive;
    color: #ffffff;
    font-size: 3rem;
  }
  span {
    font-weight: 400;
    font-size: 13.976px;
    color: #ffffff;
    cursor: pointer;
  }
`
const FormLogin = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 20px;
  input {
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    font-weight: 400;
    font-size: 19.976px;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  button {
    height: 45px;
    background: #8c11be;
    border-radius: 4.63636px;
    border: none;
    font-weight: 400;
    font-size: 20.976px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  div {
    width: 100%;
    height: 45px;
    justify-content: center;
    align-items: center;
    background-color: #8c11be;
    color: #ffffff;
    opacity: 0.7;
    border-radius: 4.63636px;
  }
`
