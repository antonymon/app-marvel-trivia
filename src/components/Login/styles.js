import styled from "styled-components";

import { CircularProgress } from "@mui/material";

export const LoginCircularProgress = styled(CircularProgress)`

`;

export const LoginH1 = styled("h1")`
  font-size: 1.5rem;
  color: #fff;
  text-align: center;
`;

export const LoginContainer = styled("div")`  
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dfdee5;
    padding: 1em;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .name {
        border: 0;
        outline: none;
        background-color: transparent;
        border: 0;
    }

    .email {
        outline: none;
        background-color: transparent;
        border: 0;
    }

    .password {
        outline: none ;
        background-color: transparent ;
        border: 0 ;
    }
    
    .input {
        display: none;
    }

    .input:not(:checked) ~ .card .sign {
        left: 0;
        z-index: 1;
    }

    .input:not(:checked) ~ .card .log {
        left: 100%;
    }

    .input:checked ~ .toggle .icon .arrow {
        left: 50%;
        transform: rotateY(180deg);
    }

    .input:checked ~ .card .sign {
        left: -100%;
    }

   .input:checked ~ .card .log {
        left: 0;
        z-index: 1;
    }

    .toggle {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        margin: 1em 0;
    }

    .toggle .icon {
        width: 64px;
        height: 32px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 64px;
        outline: 2px solid #dfdee5;
    }

   .toggle .icon .arrow {
        position: absolute;
        left: 0;
        background: #dfdee5;
        border-radius: 50%;
        transition: all ease 0.75s;
    }

    .card {
        max-width: 480px;
        max-height: 430px;
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 16px;
        padding: 0.5em;
        background: #1f2029;
        overflow: hidden;
    }

    .card .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        transition: all ease 1s;
    }

    .card .content .title {
        font-weight: 600;
    }

   .card .content .fields {
        width: 100%;
        padding: 0 2em;
    }

   .card .content .fields .field {
        display: flex;
        align-items: center;
        gap: 0.75em;
        margin: 0.5em 0;
        padding: 1em;
        border-radius: 5px;
        background: #2A2B38;
    }
    
   .card .content .fields .field input {
        width: 100%;
        border: none;
        outline: none;
        color: #dfdee5;
        background: transparent;
    }

   .card .content .submit {
        width: 100%;
        text-align: center;
        margin: 1em 0;
    }

   .card .content .submit button {
        cursor: pointer;
        width: 50%;
        border: none;
        outline: none;
        padding: 1em 1.5em;
        border-radius: 5px;
        box-shadow: 0 6px 12px -4px #ffffff40;
        transition: all ease 0.125s;
    }

    .card .content .submit button:hover {
        outline: 4px solid #ffffff40;
    } 
    
    
    
   

   

   
`;

export const LoginLabel = styled("label")`

`;