import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../redux/userSlice";

const Header = (props) => {
  const user = useSelector((state) => state.user);
  console.log("Header: ", user);

  const dispatch = useDispatch();

  const [visible, setVisibility] = useState(false);

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall onClick={() => {
          if (window.location.pathname.includes("home") || window.location.pathname === "/") {
            scrollTo("intro")
          } else {
            window.location.href = "/home";
          }
        }}>
          <Span>{props.t("Home")}</Span>
        </CustomNavLinkSmall>
        {
          user?.accessToken && user?.roles?.includes("ROLE_USER")
            ?
            (
              <CustomNavLinkSmall onClick={() => {
                if (window.location.pathname.includes("/comics/page/")) {
                  console.log("urlPath: ", window.location.pathname);
                } else {
                  window.location.href = "/comics/page/0"
                }
              }}>
                <Span>{props.t("Play")}</Span>
              </CustomNavLinkSmall>
            )
            : null
        }
        {
          user?.accessToken && user?.roles?.includes("ROLE_ADMIN")
            ?
            (
              <CustomNavLinkSmall onClick={() => {
                if (window.location.pathname.includes("/comics/page/")) {
                  console.log("urlPath: ", window.location.pathname);
                } else {
                  window.location.href = "/comics/page/0"
                }
              }}>
                <Span>{props.t("MaintenancePlay")}</Span>
              </CustomNavLinkSmall>
            )
            : null
        }

        {
          <CustomNavLinkSmall onClick={() => {
            console.log("urlPath: ", window.location.pathname);

            if (window.location.pathname.includes("home") || window.location.pathname === "/") {
              scrollTo("leaderboard")
            } else {
              window.location.href = "/leaderboard";
            }
          }}>
            <Span>{props.t("Leaderboard")}</Span>
          </CustomNavLinkSmall>
        }


        {user?.accessToken
          ? (
            <>
              <CustomNavLinkSmall
                style={{ width: "180px" }}
                onClick={() => {
                  dispatch(Logout());
                  window.location.href = "/home";
                }}
              >
                <Span>
                  <Button onClick={() => scrollTo("home")}>{props.t("Logout")}</Button>
                </Span>

              </CustomNavLinkSmall>
            </>
          )
          :
          (
            <>
              <CustomNavLinkSmall
                style={{ width: "180px" }}
                onClick={() => {
                  console.log("urlPath: ", window.location.pathname);

                  if (window.location.pathname.includes("home") || window.location.pathname === "/") {
                    scrollTo("sigin")
                  } else {
                    window.location.href = "/home";
                    scrollTo("sigin")
                  }
                }}
              >
                <Span>
                  <Button onClick={() => scrollTo("sigin")}>{props.t("SigIn")}</Button>
                </Span>

              </CustomNavLinkSmall>
            </>
          )
        }
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.svg" width="150px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
