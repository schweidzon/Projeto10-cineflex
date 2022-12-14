import { Link } from "react-router-dom"
import styled from "styled-components"

export default function Movie({movie}) {
    
    return (
        <Link to={`/sessoes/${movie.id}`}>
            <Film data-test="movie">
                <img src={movie.posterURL} alt="filmImage"/>
            </Film>
        </Link>

    )
}

const Film = styled.div`
    width: 145px;
    height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;    
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin-bottom: -23px;
    
    cursor: pointer;
  
   
        img {
            width: 129px;
            height: 193px;
        }
`