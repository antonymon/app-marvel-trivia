import styled from "styled-components";
import { Link } from "react-router-dom";

export const ErrorButtonBack = styled(Link)`
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