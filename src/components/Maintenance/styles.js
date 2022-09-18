import styled from "styled-components";
import { Button } from "antd";
import {
  CircularProgress
} from "@mui/material";

export const ComicsCircularProgress = styled(CircularProgress)`

`;
export const MaintenanceButtonAdd = styled(Button)`  
//justify-content right force
  display: block;
  justify-content: right !important;
  margin-right: 1rem !important;

  background-color: green !important;
  padding: 0.4rem 0.8rem;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
  text-decoration: none !important;
  margin: 10px auto;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
  }
`;

export const MaintenanceTableContainer = styled("div")`
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
    border-top: 1px solid #fff;
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