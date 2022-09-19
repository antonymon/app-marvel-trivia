import { CircularProgress, Card, CardHeader, CardMedia, CardContent, Typography, Grid, CardActionArea } from "@mui/material";
import styled from "styled-components";

export const ComicsContainer = styled("div")`  
    
`;

export const CharactersCircularProgress = styled(CircularProgress)`

`;

export const CharactersCard = styled(Card)`
  background-color: #1f2029 !important;
  max-width: 100px; 
  height: 190px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  border-radius: 5; 
  border: 1px solid #fff !important;  
`;

export const CharactersTypography = styled(Typography)`
  font-weight: bold;
  font-size: 0.8rem !important;
`;

export const CharactersGrid = styled(Grid)`
  
`;

export const CharactersH1 = styled("h1")`
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
`;

export const CharactersGridClass = styled(Grid)`
  flex-grow: 1;
  flex-direction: row;
  justify-content: center !important;
  align-items: center !important;
`;

export const CharactersDiv = styled("div")`
  margin: 0.5rem;

`;

export const CharacterDivMessage = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-bottom: 1rem;
  box-shadow: 0 0 10px 5px #48529944;
  padding: 1rem;
  text-align: center;
  h1 {
    font-size: 1.5rem;
    
  }
  p {
    font-size: 1rem;
  }
`;

export const CharactersCardActionArea = styled(CardActionArea)`
`;

export const CharactersCheckboxDiv = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  font-size: 24px;
  color: transparent;

  cursor: pointer;

  input[type=checkbox] {
    display: none;
  }
  .label {
    //border: 1px solid #000;
    display: inline-block;
    padding: 3px;
    background: url("/img/unchecked.png") no-repeat left center;
  }
  input[type=checkbox]:checked + .label {
    //background: #f00;
    //color: #fff;
    background-image: url("/img/checked.png");
  }
  
`;

export const CharactersCheckboxInput = styled("input")`  
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 30px;
  height: 50px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  :checked {
    background-color: #fff;
  }
  :checked::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 50px;
    background-color: red;
    box-shadow: inset 0 0 0 5px red;
  }
`;

export const CharactersCardHeader = styled(CardHeader)`
  border-bottom: '1px solid #fff !important';
  font-weight: bold;
  
`;

export const CharactersCardContent = styled(CardContent)`
  /* text-align: left; */
  
`;

export const CharactersCardMedia = styled(CardMedia)`
    height: 100%;
    width: 100%;
    border: 1px solid #fff !important;
`;