import styled from "styled-components";
import {
  CircularProgress
} from "@mui/material";

export const MiddleCircularProgress = styled(CircularProgress)`

`;

export const MiddleBlockSection = styled("section")`
  position: relative;
  padding: 1rem 0 3rem;
  text-align: center;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    padding: 5.5rem 0 3rem;
  }
`;

export const Content = styled("p")`
  padding: 0.75rem 0 0.75rem;
`;

export const ContentWrapper = styled("div")`
  max-width: 570px;

  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Leaderboard = styled("div")`

  div {
    text-align: center;
    background-color: transparent;
    font-family: "Overpass Mono", system-ui;
  }

  .content {
    display: flex;
    justify-content: space-around;
  }

  .recent {
    display: flex;
    justify-content: space-around;
  }

  .info {
    margin: 10px;
  }
  .dark {
    background-color: #1f2029;
    color: #dfdee5;
    border: solid 1px #1f2029;
  }

  .card {
    display: flex;
    justify-content: space-around;
    color: #1f2029;
    background-color: #1f2029;
  }

  .medium-txt {
    font-size: 1.4rem;
    font-weight: 400;
    margin: 2px 0px 12px 0;
  }

  .small-txt {
    font-weight: 200;
    font-size: 1rem;
    margin: 0;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  .medium-card {
    margin: 15px auto;
    border-radius: 10px;
    width: 300px;
    padding: 20px 5px 10px 10px;
  }

  .card-avatar {
    width: 100px;
    height: auto;
    border-radius: 100px;
    background-color: #dfdee5;
    margin: 15px;
  }

  #profile-top-txt {
    font-weight: 300;
    font-size: 1.2rem;
    margin: 0;
  }

  #profile-mid-txt {
    font-weight: 400;
    font-size: 1.2rem;
    margin: 0;
  }

  #profile-bot-txt {
    font-weight: 400;
    font-size: 0.9rem;
    margin: 3px 0 0 0;
  }

  .date {
    font-weight: 200;
    font-size: 0.8rem;
  }

  .points {
    font-weight: 400;
    font-size: 1rem;
  }

  .gold {
    color: #fdcb6e;
  }

  .silver {
    color: #c0c0c0;
  }

  .brown {
    color: #964b00;
  }

  .blue {
    color: #00cec9;
  }

  table {
    text-align: left;
    width: 600px;
    margin: 10px auto;
  }

  .table-div {
    margin: 0 auto;
    width: 600px;
    padding: 20px;
    border-radius: 10px;
  }

  #top-table {
    display: flex;
    justify-content: space-between;
    text-align: left;
    width: 600px;
  }

  #table-title {
    font-weight: 400;
    font-size: 1.1rem;
    margin: auto 0px auto 20px;
  }

  #table-date {
    font-weight: 200;
    font-size: 0.9rem;
    margin: auto 20px auto 20px;
    padding: 8px 12px;
  }

  #tr-head {
    font-weight: 200;
    font-size: 0.9rem;
  }

  .avatar-table {
    width: 70px;
    background-color: transparent;
    border-radius: 40px;
  }

  .txt-recently {
    font-weight: 200;
    font-size: 0.9rem;
  }

  #txt-recently-title {
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #c61414;
    border-radius: 5px;
    padding: 2px 3px;
    border: solid 1px gray;
  }

  .gold-background {
    background-color: #fdcb6e;
  }
  .silver-background {
    background-color: #c0c0c0;
  }
  .brown-background {
    background-color: #964b00;
  }
  .blue-background {
    background-color: #00cec9;
  }

  .rounded-span {    
    border-radius: 5px;
    padding: 2px 3px;
  }
`;
