import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

import styled from 'styled-components';

import UserContext from "../../context/userContext"
import Header from "./Header"

function RequestJob() {

  const navigate = useNavigate()

  const { requestJobInfo, setType } = useContext(UserContext)
  const { clientName, clientPhoto, clientCity } = useContext(UserContext)
  const { clientToken } = useContext(UserContext)

  const config = {
    headers: {
      Authorization: `Bearer ${clientToken}`
    }
  }

  const [date, setDate] = useState("")

  function formatDate() {

    const splited = date.split("-")
    const reverseArray = splited.reverse()
    const toString = reverseArray.toString()
    const format = toString.replaceAll(",", "/")
    const dateFormat = format.replaceAll(" ", "")

    let dateParts = dateFormat.split("/")
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    if (dayjs().isAfter(dateObject)) {
      alert(`Escolha uma data válida. Após ${dayjs().format('DD/MM/YYYY')}`)
    } else {
      const objRequest = {
        professionalId: requestJobInfo.id,
        date: dateFormat
      }

      handleJobRequest(objRequest)
    }
  }

  function handleJobRequest(objRequest) {
    const URL = "https://home-care-app.herokuapp.com/request/job"

    const promise = axios.post(URL, objRequest, config)

    promise.then(response => {
      alert("Pedido feito com sucesso, aguarde confirmação do profissional!")
      setType("")
      navigate("/homePage/client")
    })
    promise.catch(err => {
      console.log("deu ruim", err)
    })
  }

  return (
    <Container>
      <Header />

      <ProfileSidebar>
        <ContainerInfos>
          <img src={clientPhoto} ></img>
          <p>{clientName}</p>
          <p>{clientCity}</p>
        </ContainerInfos>
      </ProfileSidebar>

      <Body>
        <ProfessionalBox>
          <Photo >
            <img src={requestJobInfo.profilePhoto} />
          <p>{requestJobInfo.type === "garden" ? "Jardinagem" : requestJobInfo.type === "cleaning" ? "Limpeza" : "Serviço Elétrico"}</p>

            <button onClick={() => { formatDate() }}>Reserve agora</button>

          </Photo>
          <Infos>
            <p>{requestJobInfo.fullName}</p>
            <p>{requestJobInfo.city}</p>

            <p>Insira aqui a data desejada</p>
            <input type="date" placeholder="dd-mm-yyyy" value={date} min="2022-08-15" max="2023-12-31" onChange={(e) => setDate(e.target.value)} />
          </Infos>
        </ProfessionalBox>
      </Body>
      <button></button>
    </Container>
  )
}

const Container = styled.main`
    display: flex;
    flex-wrap: wrap;
    //width: 100vw;
    //height: 100vh;
    background-color: #333333;
`
const ProfileSidebar = styled.div`
    width: 17.5vw;
    height: 100%;
    position:fixed;
    border-right: solid 0.5px #4e4e4e;
`
const ContainerInfos = styled.div`
    margin-top: 19vh;
    margin: auto auto;
    width: 14vw;

    img {
        margin-top: 23vh;
        width: 185px;
        height: 185px;
        border-radius: 100%;
        border: solid 2px #1a1a1a;
    }

    p {
        font-size: 18px;
        color: white;
        margin-top: 10px;
        font-weight: 700;
    }

    p:last-of-type {
        font-size: 14px;
        color:white;
        margin-top: 5px;
        font-weight: 300;
    }

    button {
        margin-left: 13px;
        width: 12vw;
        height: 5vh;
        margin-top: 25px;
        border: none;
        border-radius: 8px;
        color: white;
        background-color: #9b9b9b;
        cursor: pointer;
    }
`

const Body = styled.div`
    margin: 0px auto;
    width: 65vw;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #333333;
`
const ProfessionalBox = styled.div`
    margin-left: 15px;
    width: 50vw;
    height: 45vh;
    margin-top: 45px;
    border-radius: 8px;
    background-color: #d1d1d1;
    display: flex;
`
const Photo = styled.div`
    display: flex;
    flex-direction: column;
    width: 15vw;
    background-color: #55a381;
    border-radius: 8px;

    img {
        margin: 20px auto;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        border: solid 2px #000000;
    }

    p:first-of-type {
        color: white;
        font-size: 15px;
        font-weight: 700;
        margin: -5px auto;
    }

    button {
        margin: 40px auto;
        border-radius: 8px;
        border: none;
        width: 10vw;
        height: 5vh;
        background-color: #333333;
        color: white;
        cursor: pointer;
    }
`
const Infos = styled.div`
    width: 35vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    p:first-of-type  {
        margin-top: 20px;
        color: #333333;
        font-size: 30px;
    }

    p:nth-child(2) {
        margin-top: 10px;
        color: #333333;
        font-size: 20px;
    }

    p:nth-child(3) {
        margin-top: 120px;
        color: #333333;
        font-size: 15px;
    }

    p:nth-child(4) {
        margin-top: 15px;
        color: #333333;
        font-size: 15px;
    }

    input {
        margin-top: 10px;
        height: 30px;
        border: none;
        border-radius: 8px;
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }

    input::placeholder {
        font-size: 15px;
        color: #8d8a8a;
    }
`

export default RequestJob