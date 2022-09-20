import styled from "styled-components";
import {
  CircularProgress
} from "@mui/material";

export const ComicsCircularProgress = styled(CircularProgress)`

`;
export const PlayConatiner = styled("div")`  
  * {
    box-sizing: border-box;
    font-family: "Roboto Condensed", sans-serif;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #242940;
    // background-color: #000;
    color: #fff;
    background-image: linear-gradient(to right, #242940, #242940);
  }

  img{
    max-width: 100%;
  }

  
  @for $i from 1 through 10{
    [data-percent='#{$i}']:before{
        width: #{$i*10%};
      }
  }

  @keyframes poof {
    0% {
      opacity: 0;
      transform: translateY(-5px)
    }
    100% {
      opacity: 1;
      transform: translateY(0px)
    }
  }

`;
export const PlayMain = styled("div")`
    position: relative;
    padding: 20px 10px;
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: transparent;
      transition: all .3s ease;
    }
`;

export const PlayMainInner = styled("div")`
    position: block;
    padding: 20px 10px;
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: transparent;
      transition: all .3s ease;
    }
    max-width: 500px;
    margin: 0 auto;
`;

export const PlayQuestion = styled("div")`
    p{
      min-height: 80px;
      padding: 0 5px;
    }
`;

export const PlayBtns = styled("div")`
    display: flex;
    place-content: center;
`;

export const PlayPopup = styled("div")`
    transition: all .3s ease;
    position: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;    
    background-color: transparent;
    display: grid;
    place-content: center;
`;

export const PlayPopupInner = styled("div")`
    transition: all .3s ease;
    position: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #242940;
    display: grid;
    place-content: center;

    margin-top: 5% !important;
    height: 85% !important;

    animation: poof .5s;
    background-color: #D0DCE8;
    color: #242940;
    width: 80%;
    
    margin: 0 auto;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 0px 12px 0px rgb(0, 0, 0, 0.45);
    text-align: center;
    @media (max-width: 500px) {
    width: 90%;
    }
    
    h4{
      margin-top: 1rem;
      display: inline-block;
      font-size: 20px;
    }
    .score{
      font-weight: bold;
      font-size: 32px;
      color: #15B358;
    }
    img{
      display: inline-block !important;
      margin-top: 2rem;
      margin-bottom: 0 !important;
      width: 100%;
      box-shadow: 0 3px 5px -2px rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      min-width: 220px;
    }
    p{
      font-weight: bold;
      color: #242940;
      margin-bottom: 0 !important;
    }
`;

export const PlayH1 = styled("h1")`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

export const PlayHead = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 2px;
  font-size: 1.8rem;
  color: #fff;
  &:before{
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translatex(-50%);
    width: 99%;
    height: 3px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 1);
    transition: all .3s ease;
  }
`;

export const PlayGreenBtn = styled("button")`
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 22px;
    text-decoration: none;
    margin: 20px;
    color: #fff;
    position: relative;
    display: inline-block;
    &:active {
      transform: translate(0px, 5px);
      -webkit-transform: translate(0px, 5px);
      box-shadow: 0px 1px 0px 0px;
    }

    background-color: #2ecc71;
    box-shadow: 0px 5px 0px 0px #15B358;
    &:hover {
      background-color: #48E68B;
    }
`;

export const PlayRedBtn = styled("button")`
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 22px;
    text-decoration: none;
    margin: 20px;
    color: #fff;
    position: relative;
    display: inline-block;
    &:active {
      transform: translate(0px, 5px);
      -webkit-transform: translate(0px, 5px);
      box-shadow: 0px 1px 0px 0px;
    }

    background-color: #e74c3c;
    box-shadow: 0px 5px 0px 0px #CE3323;
    &:hover {
      background-color: #FF6656;
    }
`;

export const PlayGeneralBtn = styled("button")`
    cursor: pointer;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 22px;
    text-decoration: none;
    margin: 20px;
    color: #fff;
    position: relative;
    display: inline-block;
    &:active {
      transform: translate(0px, 5px);
      -webkit-transform: translate(0px, 5px);
      box-shadow: 0px 1px 0px 0px;
    }

    background-color: #2ecc71;
    box-shadow: 0px 5px 0px 0px #15B358;
    &:hover {
      background-color: #48E68B;
    }
`;