import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'

export default function TelaCadastro() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [password, setPassword] = useState('')
  const [able, setAble] = useState(true)

  const navigate = useNavigate()

  function cadastrarUsuario(event) {
    event.preventDefault()
    setAble(false)

    const dadosCadastrados = {
      email,
      name,
      password,
      checkPassword
    }

    if ((email || name || checkPassword || password) !== null) {
      const URL = 'http://localhost:5000/cadastro'
      const promise = axios.post(URL, dadosCadastrados)
      promise
        .then(response => {
          navigate('/')
        })
        .catch(err => {
          alert(err.response.data)
          setAble(true)
        })
    }
  }

  return (
    <ConteudoLogin>
      <h1>MyWallet</h1>
      {able ? (
        <FormLogin onSubmit={cadastrarUsuario}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="nome"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirme a senha"
            value={checkPassword}
            onChange={e => setCheckPassword(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </FormLogin>
      ) : (
        <FormLogin onSubmit={cadastrarUsuario}>
          <input type="email" placeholder="E-mail" disabled />
          <input type="text" placeholder="nome" disabled />
          <input type="text" placeholder="image" disabled />
          <input type="password" placeholder="senha" disabled />
          <div>
            <ThreeDots color="white" />
          </div>
        </FormLogin>
      )}
      {able ? (
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span>Já tem uma conta? Entre agora!</span>
        </Link>
      ) : (
        <Link to="" style={{ textDecoration: 'none' }}>
          <span>Já tem uma conta? Entre agora!</span>
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
  padding-top: 150px;
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
