import styled from "styled-components";
import { Card, CardActionArea, CardMedia, Typography, Grid, CircularProgress, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

export const ComicsListLinkNext = styled(Link)`
	padding: 0.4rem 0.8rem;
	background-color: #e12f2f;
	border-radius: 3px;
	color: white;
	font-weight: bold;
	font-size: small;
	text-decoration: none !important;
	margin: 5px;
	border: 2px solid transparent;
	transition: all 0.2s ease-in-out;

  &:hover {
	background-color: white;
	border: 2px solid #e12f2f;
	color: #e12f2f;
}
`;

export const ComicsListLinkPrevious = styled(Link)`
	margin-right: auto;
	padding: 0.4rem 0.8rem;
	background-color: #e12f2f;
	border-radius: 3px;
	color: white;
	font-weight: bold;
	font-size: small;
	text-decoration: none !important;
	margin: 5px;
	border: 2px solid transparent;
	transition: all 0.2s ease-in-out;

  &:hover {
	background-color: white;
	border: 2px solid #e12f2f;
	color: #e12f2f;
}
`;

export const ComicsListLinkBack = styled(Link)`
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

export const ComicsListCard = styled(Card)`
	color: #1f2029;
    max-width: 250;
	height: 100%;
	background-color: #1f2029 !important; 
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
    border-radius: 5;
    border: 1px solid #fff !important;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const ComicsListCardActionArea = styled(CardActionArea)`
  
`;

export const ComicsListGrid = styled(Grid)`
	padding-bottom: 1rem;
`;

export const ComicsListCircularProgress = styled(CircularProgress)`
  
`;

export const ComicsListCardContent = styled(CardContent)`
  background-color: #1f2029;
  font-size: 1rem;
`;

export const ComicsListCardMedia = styled(CardMedia)`
    height: 100%;
    width: 100%;
`;

export const ComicsListTypography = styled(Typography)`
    font-weight: bold;
	text-align: center;
`;

export const ComicsListPagination = styled("div")`
    display: flex;
    justify-content: space-between;
    margin: 10px 20px 20px 20px;
	
`;

export const ComicsListsearchResultTerm = styled("div")`
    display: flex;
    margin: 1rem 0 1rem 0;
    align-items: flex-start;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
  `;

export const ComicsListsearchResultContainer = styled("div")`
    margin-top: 1rem;
  `;

export const ComicsListsearchResultDiv = styled("div")`
    display: flex;
	  justify-content: center;
    margin-top: 1rem;
  `;
