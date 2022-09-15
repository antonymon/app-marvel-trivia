import { CircularProgress, Card, CardHeader, CardMedia, CardContent, Typography, Grid, CardActionArea, Checkbox } from "@material-ui/core";
import styled from "styled-components";

export const ComicsContainer = styled("div")`  
    
`;

export const CharactersCircularProgress = styled(CircularProgress)`

`;

//checkbox on character card to select character
export const CharacterCheckbox = styled(Checkbox)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const CharactersCard = styled(Card)`
  background-color: #1f2029 !important;
  max-width: 250px; 
  height: 90%;   
  border-radius: 5;  
  border: 1px solid #fff !important;  
`;

export const CharactersTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem !important;
`;

export const CharactersGrid = styled(Grid)`
  flex-grow: 1;
  flex-direction: row;
`;

export const CharactersDiv = styled("div")`
  margin: 0.5rem;
`;

export const CharactersCardActionArea = styled(CardActionArea)`
    

`;
export const CharactersCardHeader = styled(CardHeader)`
  border-bottom: '1px solid #1e8678';
  font-weight: bold;
  
`;

export const CharactersCardContent = styled(CardContent)`
  text-align: left;
  
`;

export const CharactersCardMedia = styled(CardMedia)`
    height: 100%;
    width: 100%;
    border: 1px solid #fff;
`;