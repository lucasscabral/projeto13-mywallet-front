import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../UseContext'
import ImagemDeSaida from '../../imagens/imagem-saida.png'
import ImagemNovaEtrada from '../../imagens/novaEntrada.png'
import ImagemNovaSaida from '../../imagens/novaSaida.png'

export default function TelaMovimentacao() {
  const { dadosLoginUsuario, movimentacoes, setMovimentacoes } =
    useContext(UserContext)
  const navigate = useNavigate()

  let saldo = 0
  let entrada = 0
  let saida = 0
  if (movimentacoes) {
    let valorEntrada = movimentacoes.filter(valores => {
      if (valores.tipo === 'entrada') entrada += Number(valores.valor)
    })
    let valorSaida = movimentacoes.filter(valores => {
      if (valores.tipo === 'saida') saida += Number(valores.valor)
    })
  }
  saldo = entrada - saida
  useEffect(() => {
    const URL = 'http://localhost:5000/movimentacao'
    const promise = axios.get(URL, {
      headers: {
        Authorization: `Bearer ${dadosLoginUsuario?.token}`
      }
    })
    promise
      .then(response => {
        setMovimentacoes([...response.data])
      })
      .catch(error => {
        alert(error.response.data)
      })
  }, [])

  function logOut() {
    navigate('/')
  }

  return (
    <Conteudos>
      <Topo>
        <span>Olá, {dadosLoginUsuario?.name}</span>
        <img src={ImagemDeSaida} alt="LogOut" onClick={logOut} />
      </Topo>
      <MovimentacoesUser>
        {movimentacoes.length === 0 ? (
          <h1>Não há registros de entrada ou saída</h1>
        ) : (
          <>
            <ScrollarMovimentacoes>
              {movimentacoes?.map((movimentacao, id) => (
                <ConteudoMovimentacao>
                  <Dia>{movimentacao.data}</Dia>
                  <Descricao>
                    <p>{movimentacao.descricao}</p>
                  </Descricao>
                  <Valor
                    color={
                      movimentacao.tipo === 'entrada' ? '#03AC00' : '#c70000'
                    }
                  >
                    {Number(movimentacao.valor)?.toFixed(2)}
                  </Valor>
                </ConteudoMovimentacao>
              ))}
            </ScrollarMovimentacoes>
            <Saldo>
              <span>SALDO</span>
              <span>{saldo.toFixed(2)}</span>
            </Saldo>{' '}
          </>
        )}
      </MovimentacoesUser>
      <Buttons>
        <Link to="/entrada" style={{ textDecoration: 'none' }}>
          <ButtonEntrada>
            <img src={ImagemNovaEtrada} alt="Botao para deposito" />
            <p>
              Nova <br /> Entrada
            </p>
          </ButtonEntrada>
        </Link>
        <Link to="/saida" style={{ textDecoration: 'none' }}>
          <ButtonSaida>
            <img src={ImagemNovaSaida} alt="Botao para pagamento" />
            <p>
              Nova <br /> Saída
            </p>
          </ButtonSaida>
        </Link>
      </Buttons>
    </Conteudos>
  )
}

const Conteudos = styled.div`
  background-color: #8c11be;
  width: 100%;
  height: 100vh;
  font-family: 'Lexend Deca', sans-serif;
  box-sizing: border-box;
  padding: 25px 25px;
`

const Topo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
  }
  img {
    cursor: pointer;
  }
`
const MovimentacoesUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: #ffffff;
  margin-top: 30px;
  width: 100%;
  height: 446px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 15px 10px;
  h1 {
    text-align: center;
    width: 200px;
    font-weight: 400;
    font-size: 20px;
    color: #868686;
  }
`
const ScrollarMovimentacoes = styled.div`
  overflow: scroll;
  width: 100%;
  height: 90%;
`
const ConteudoMovimentacao = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`
const Dia = styled.span`
  color: #c6c6c6;
  font-weight: 400;
  font-size: 16px;
`
const Descricao = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5px;
  height: 100%;
  margin-left: 10px;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
`
const Valor = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.color};
`
const Saldo = styled.div`
  padding: 0 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 10px;
  span:nth-child(1) {
    font-weight: 700;
    font-size: 17px;
    color: #000000;
  }
  span:nth-child(2) {
    font-weight: 700;
    font-size: 17px;
    color: #03ac00;
  }
`
const Buttons = styled.div`
  justify-content: space-between;
  margin-top: 80px;
  width: 100%;
  display: flex;
`
const ButtonEntrada = styled.div`
  box-sizing: border-box;
  padding: 10px 10px;
  display: block;
  width: 155px;
  height: 114px;
  background-color: #a328d6;
  border-radius: 5px;
  p {
    color: #ffffff;
    margin-top: 30px;
  }
`
const ButtonSaida = styled.div`
  box-sizing: border-box;
  padding: 10px 10px;
  display: block;
  width: 155px;
  height: 114px;
  background-color: #a328d6;
  border-radius: 5px;
  p {
    color: #ffffff;
    margin-top: 30px;
  }
`
