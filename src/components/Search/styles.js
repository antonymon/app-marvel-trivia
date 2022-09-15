import styled from "styled-components";

export const SearchForm = styled("form")`
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  width: 60%;
`;

export const SearchBar = styled("input")`
  background-color: #1f2029;
  color: #fff;
  font-size: 1rem;
  height: 40px;
  border-radius: 3px 0 0 3px;
  padding: 0 10px;
  margin: 10px auto;
  border: 1px solid #fff;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
  }
`;

export const SearchBtn = styled("button")`
  padding: 0.4rem 0.8rem;
  background-color: #ff0000;
  border-radius: 0 3px 3px  0;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  height: 40px;
  width: 20%;
  text-decoration: none !important;
  margin: 10px auto;
  border: 1px solid;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  }
/*   
  @media only screen and (max-width: 890px) {
          font-size: 47px;
        } */
      
  @media only screen and (max-width: 414px) {
    font-size: 0.8rem;
    width: 30%;
  }
`;
