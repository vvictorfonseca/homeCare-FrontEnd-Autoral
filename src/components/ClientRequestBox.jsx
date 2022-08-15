import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import UserContext from "./context/userContext"

function ClientRequestBox(jobInfo) {

    const navigate = useNavigate()

    const { clientToken, setReload, reload } = useContext(UserContext)
    console.log("token", clientToken)

    const params = jobInfo.id

    function deleteRequest() {
        if(window.confirm("Você deseja cancelar sua solicitação?")) {

            const config = {
                headers: {
                    Authorization: `Bearer ${clientToken}`
                }
            }

            console.log("params", params)

            const URL = `http://localhost:5000/delete/job/${params}`

            const promise = axios.delete(URL, config)
            promise.then(response => {
                console.log("apagou em", response.status)
                {reload ? setReload(false) : setReload(true)}
            })
        }
    }

    return (
        
            <Box>
                <Photo >
                    <img src={jobInfo.professionals.profilePhoto} ></img>
                    <p>{jobInfo.professionals.type}</p>

                    <button onClick={() => deleteRequest()} >Cancelar Pedido</button>
                </Photo>
                <Infos>
                    <p>{jobInfo.professionals.fullName}</p>
                    <p>{jobInfo.professionals.city}</p>
                    <p>{jobInfo.date}</p>
                    <p>Status: {jobInfo.isConfirmed === true ? "Confirmado" : "Pendente"}</p>

                    <ProfessionalDescription>
                        
                        {jobInfo.professionals.description == null ? (
                            <p>O profissional ainda não possui descrição.</p>
                        ) :(
                            <p>{jobInfo.professionals.description}</p>
                        ) }
                    
                    </ProfessionalDescription>
                </Infos>
            </Box>
        
    )
}

const Box = styled.div`
    margin-bottom: -180px;
    margin: 25px auto;
    width: 50vw;
    height: 45vh;
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

    img:first-of-type {
        margin: 20px auto;
        width: 125px;
        height: 125px;
        border-radius: 100%;
        border: solid 2px #4e4e4e;
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
        margin-top: 5px;
        color: #333333;
        font-size: 20px;
    }

    p:nth-child(3) {
        margin-top: 5px;
        color: #333333;
        font-size: 15px;
        font-weight: 700
    }

    p:nth-child(4) {
        margin-top: 10px;
        color: #333333;
        font-size: 20px;
    }
`
const ProfessionalDescription = styled.div`
    margin-top: 17px;
    border-radius: 8px;
    display: flex;
    align-items:center;
    justify-content: center;
    width: 25vw;
    height: 20vh;
    background-color: #e2e2e2;

    p:first-of-type {
        margin-top: -50px;
        font-size: 13px;
    }
`

export default ClientRequestBox