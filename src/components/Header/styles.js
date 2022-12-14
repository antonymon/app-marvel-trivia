import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

export const HeaderSection = styled("header")`
  background-color: #1f2029;
  padding: 1rem 0.5rem;
  
  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
`;

export const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

export const CustomNavLink = styled("div")`
  width: 203px;
  display: inline-block;

  @media only screen and (max-width: 411px) {
    width: 150px;
  }

  @media only screen and (max-width: 320px) {
    width: 118px;
  }
`;

export const ContactWrapper = styled("div")`
  cursor: pointer;
  width: ${(p) => (p.width ? "100%" : "110px")};
  font-weight: 700;
  text-align: center;
  border-radius: 1.25rem;
  display: inline-block;
`;

export const Burger = styled("div")`
  @media only screen and (max-width: 890px) {
    display: block;
  }

  display: none;

  svg {
    fill: #dfdee5;
  }
`;

export const NotHidden = styled("div")`
  @media only screen and (max-width: 890px) {
    display: none;
  }
`;

export const ContainerMenu = styled("div")`
  display: flex;
  padding: 0;
  margin: 0;
`;

export const DivInfo = styled("div")`
  //aling-items: left;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  h5 {//name
    text-align: left;
    font-weight: 400;
    font-size: 1.25rem;
    color: #1f2029;
    padding: 0;
    margin: 0;
  }
  h6 { //email
    text-align: left;
    font-weight: 400;
    font-size: 0.8rem;
    color: #1f2029;
    padding: 0;
    margin: 0;
  }
`;

export const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  @media only screen and (max-width: 890px) {
    color: #1f2029;
  }
`;

export const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #dfdee5;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
  @media only screen and (max-width: 890px) {
    color: #1f2029;
  }
`;

export const Label = styled("span")`
  font-weight: 500;
  color: #dfdee5;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

export const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover{
    img {
      transform: scale(1.1);
    }
  }

  &:active,
  &:focus {
    color: #dfdee5;
    text-underline-position: under;
    text-decoration: #dfdee5 wavy underline;
  }

    .avatar-profile {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 40px;
    }
`;
