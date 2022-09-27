import styled from "styled-components";

import {
  CircularProgress
} from "@mui/material";

export const ComicsCircularProgress = styled(CircularProgress)`

`;

export const ProfileImage = styled("div")`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  .upload{
    display: none;
  }

  input{
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;

  }

  span{
      .img {
        width: 100px;
        height: 100px;
        background-color: transparent;
        object-fit: cover;
        transition: all 0.3s ease-in-out;   
      }
      &:hover {
        .img {
          display: none;
        }
        .upload {
          display: block;
          width: 80px;
          height: 80px;
          background-color: transparent;
          object-fit: cover;
          transition: all 0.3s ease-in-out; 
        }
      }
  }
`;


export const ProfileContainer = styled("div")`  
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dfdee5;
    width: 400px;
    height: 60vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    .divBtn{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
    }
    .btnActualizar{
      background-color: green;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      &:hover{
        background-color: rgba(0, 255, 0, 0.8);
        object-fit: cover;
        transition: all 0.3s ease-in-out; 
      }
    }

    .btnCerrarSesion{
      background-color: red;
      font-size: 1rem;
      font-weight: 600;
      color: #fff;
      padding: 0.5rem 1rem;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      border: none;
      &:hover{
        background-color: rgba(255, 0, 0, 0.8);
        object-fit: cover;
        transition: all 0.3s ease-in-out; 
      }
    }

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

    .card {
        max-width: 480px;
        max-height: 480px;
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