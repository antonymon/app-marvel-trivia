import {
  CircularProgress,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

import styled from "styled-components";
import { Link } from "react-router-dom";

export const ComicsContainer = styled("div")`  
    background-color: #1f2029 !important;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    padding: 1rem;
`;

export const ComicsCircularProgress = styled(CircularProgress)`

`;

export const ComicsCard = styled(Card)`
    background-color: #1f2029 !important;
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem !important;
    margin-bottom: 40px;
    border-radius: 4px;
    border: 1px solid #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    
`;

export const ComicsDivButton = styled("div")`
  display: block;
	justify-content: right !important;
  margin-top: 1rem;
`;

export const CharactersCards = styled(Card)`
    background-color: #1f2029 !important;
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 4px !important;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
`;

export const ComicsCardHeader = styled(CardHeader)`
    border-bottom: 1px solid #fff;
    font-weight: bold;
    color: #fff;
`;

export const ComicsCardMedia = styled(CardMedia)`
  height: "100%";
  width: "100%";
  object-fit: "cover";
`;

export const ComicsCardContent = styled(CardContent)`
  text-align: left;
`;

export const ComicsTypography = styled(Typography)`
  text-align: left;
  color: #fff !important;
  
`;

export const ComicsTitle = styled("h6")`
  margin-top: 3px;
  font-size: 1.5rem; 
`;

export const ComicsP = styled("p")`
  margin-top: 3px;
  font-size: 1rem; 
`;

export const ComicsDiv = styled("div")`
  margin-top: 3px;
  font-size: 1rem; 
  
`;

export const ComicsDivCenter = styled("div")`
  display: flex;
  justify-content: center;
`;

export const ComicsButtonBackContainer = styled("div")`
    display: flex !important;
    justify-content: space-between;
    margin: 10px 20px 20px 20px;
	
`;

export const ComicsButtonBack = styled(Link)`
	padding: 0.4rem 0.8rem;
  background-color: #e12f2f;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  text-decoration: none !important;
  margin: 10px auto;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    color: #e12f2f;
    border: 2px solid #e12f2f;
  }
`;

export const ComicsTableContainer = styled("div")`
  margin-bottom: 1rem !important;
  h6 {
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  tr:first-child {
    border-top: none;
    background: transparent;
    color: #fff;
  }

  tr {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    background-color: transparent;
  }

  tr:nth-child(odd):not(:first-child) {
    background-color: transparent;
  }

  th {
    display: none;
  }

  td {
    display: block;
  }

  td:first-child {
    margin-top: .5em;
  }

  td:last-child {
    margin-bottom: .5em;
  }

  td:before {
    content: attr(data-th) ": ";
    font-weight: bold;
    width: 120px;
    display: inline-block;
    color: #fff;
  }

  th,
  td {
    text-align: left;
  }

    color: #fff;
    border-radius: .4em;
    overflow: hidden;
  

  tr {
    border-color: #fff;
  }

  th,
  td {
    padding: .5em 1em;
  }

    @media screen and (max-width: 601px) {
      tr:nth-child(2) {
        border-top: none;
      }
    }
    @media screen and (min-width: 600px) {
      tr:hover:not(:first-child) {
        /* background-color: #d8e7f3; */
        background-color: rgba(255, 255, 255, 0.3);
      }
      td:before {
        display: none;
      }
      th,
      td {
        display: table-cell;
        padding: .25em .5em;
      }
      th:first-child,
      td:first-child {
        padding-left: 0;
      }
      th:last-child,
      td:last-child {
        padding-right: 0;
      }
      th,
      td {
        padding: 1em !important;
      }
  }
`;