import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import MovieSeats from "../components/MovieSeats"
import { Link, useParams } from "react-router-dom"

export default function MovieSeatsPage({ selectedTime, selectedSeats, setSelectedSeats,setPage, film, setFilm }) {

    const { idSessao } = useParams()
    
    const [seatsId, setSeatsId] = useState([])

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        //promise.then(resp => console.log(resp.data.movie.posterURL))
        promise.then(resp => setFilm(resp.data))
    }, [])

    function selectSeat(film) {
        console.log(film)
        if (!film.isAvailable) {
            alert("Esse assento não está disponível")
        }

        if (selectedSeats.includes(film.name)) {
            setSelectedSeats(selectedSeats.filter(f => f !== film.name))
            return

        }
        const selectSeats = [...selectedSeats, film.name]
        const seatsIds = [...seatsId, film.id]
        setSeatsId(seatsIds)
        console.log(selectSeats)
        const selectSeatsInOrder = selectSeats.sort(function(a,b) {
            return a-b
        })
        setSelectedSeats(selectSeatsInOrder)
        

    }

    function reserveSeats() {
        if(selectedSeats.length === 0) {
            alert('Selecione pelo menos uma cadeira')
            return
        }
        const obj = { ids: seatsId, name: "Fulano", cpf: "12345678900" }
        axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", obj)
        setPage("/sucesso")
    }




    console.log(film)

    if (film) {
        return (
            <>
                <FilmSeats>
                    <MovieSeats seats={film.seats} selectedSeats={selectedSeats} selectSeat={selectSeat} />
                </FilmSeats>
                <Inputs>
                    <div>
                        <p>Nome do comprador:</p>
                        <input placeholder="Digite seu nome..." />
                    </div>
                    <div>
                        <p>Nome do comprador:</p>
                        <input placeholder="Digite seu nome..." />
                    </div>
                </Inputs>
                <StyledLink to={selectedSeats.length > 0 && "/sucesso"}>
                    <ReserveSeats onClick={reserveSeats}>Reservar assento(s)</ReserveSeats>
                </StyledLink>


                <Poster>
                    <div>
                        <img src={film.movie.posterURL} />
                    </div>
                    <div>
                        <h1>{film.movie.title}</h1>
                        <h2>{selectedTime.day} - {selectedTime.time}</h2>

                    </div>
                </Poster>


            </>

        )

    }



}


const FilmSeats = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
flex-wrap: wrap;
width: 375px;
margin: auto;
   

`
 
const StyledLink = styled(Link)`
text-decoration:none;`







const Inputs = styled.div`
    width: 375px;
    margin: auto;
    margin-top:50px;
        div {
            margin-bottom: 20px;
            margin-left: 25px;
           
        }
        p {
            color:#293845;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            margin-bottom: 5px;

        }
        input {
            width: 327px;
            height: 51px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 3px;
            padding: 10px;
        }
        input::placeholder {
            font-size: 18px;
            font-family: 'Roboto';
            font-style: italic;
            color: #AFAFAF
        }
`

const ReserveSeats = styled.button`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;
    border-style: none;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 50px;
    cursor: pointer;
`

const Poster = styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    background: #DFE6ED;
    border-top: 1px solid #9EADBA;
    gap: 10px;
        div:first-of-type {
            width: 64px;
            height: 89px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
        }
        img {
            width: 48px;
            height: 72px;
        }
        h1, h2{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 26px       
        }
        h1 {
            margin-bottom: 5px;
        }
       
`