import { Link } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage({ selectedSeats, setSelectedSeats, film, buyers, setBuyers }) {

    return (
        <>
            <SuccesStyle>
                <div data-test="movie-info">
                    <h2>Filme e sessão</h2>
                    <p>{film.movie.title}</p>
                    <p>{`${film.day.date}  ${film.name}`}</p>
                </div>
                <div data-test="seats-info">
                    {buyers.length === 1 ? <h2>Ingresso</h2> : <h2>Ingressos</h2>}
                    {selectedSeats.map((s) => <p>{`Assento ${s}`}</p>)}
                </div>
                <div data-test="client-info">
                    {buyers.length === 1 ? <h2>Comprador(a)</h2> : <h2>Compradores</h2>}
                    {buyers.map((c) =>
                        <BuyersInfo key={c.nome}>
                            <h1>Nome: {c.nome}</h1>
                            <p>CPF: {c.cpf}</p>
                        </BuyersInfo>

                    )}

                </div>
            </SuccesStyle>
            <Link to="/">
                <HomeButton data-test="go-home-btn" onClick={() => {
                    setSelectedSeats([])
                    setBuyers([])
                }}>Voltar para home</HomeButton>
            </Link>
        </>

    )
}

const SuccesStyle = styled.div`
    width: 210px;
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin: auto;
   
        h2 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            color: #293845;
            margin-bottom: 10px;
        }
        p {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            color: #293845;
            margin-bottom: 10px;
        }
    
    @media(max-width: 500px) {
        & {
            margin-left: 45px;
            margin-top:10px;
            width: 375px;
        }
    }
       
`

const HomeButton = styled.button`
     
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
            margin-top: 50px;
            cursor: pointer;
          
        
`

const BuyersInfo = styled.div`
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            color: #293845;
            margin-bottom: 10px;
            h1 {
                margin-bottom: 5px;
            }
            p {
                margin-bottom: 25px;
            }

`