import { CircularProgress, Card, CardHeader, CardMedia, CardContent, Typography, Grid, CardActionArea } from "@material-ui/core";
import styled from "styled-components";

export const ComicsContainer = styled("div")`  
    
`;

export const CharactersCircularProgress = styled(CircularProgress)`

`;

export const CharactersCard = styled(Card)`
  background-color: #1f2029 !important;
  max-width: 200px; 
  height: auto; 
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  border-radius: 5;  
  border: 1px solid #fff !important;  
`;

export const CharactersTypography = styled(Typography)`
  font-weight: bold;
  font-size: 1rem !important;
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

export const CharactersCardActionArea = styled(CardActionArea)`
`;

export const CharactersSpanChecked = styled("span")`
  position: absolute;
  right: 0;
  margin-top: -0.4rem;
  margin-right: 0 !important;
  padding: 0 !important;
  font-size: 2rem;

  .faSquare {
    color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      color: green;
    }
  }
  
  .faCheckSquare {    
    color: green;
    font-weight: bold;
    &:hover {
      color: white;
    }
  }
`;

export const CharactersInputChecked = styled("input")`

`;

export const CharactersLabelChecked = styled("label")`

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