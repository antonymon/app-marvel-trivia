import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import i18n from "i18next";
import {
  FooterSection,
  NavLink,
  LogoContainer,
  FooterContainer,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";

const Footer = ({ t }) => {
  const handleChange = (language) => {
    i18n.changeLanguage(language);
  };

  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between" align="middle">
            <Col>
              <Row>
                <Label htmlFor="select-lang">{t("Language")}</Label>
                <LanguageSwitchContainer>
                  <LanguageSwitch onClick={() => handleChange("en")}>
                    <SvgIcon
                      src="united-states.svg"
                      aria-label="homepage"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                  <LanguageSwitch onClick={() => handleChange("es")}>
                    <SvgIcon
                      src="spain.svg"
                      aria-label="homepage"
                      width="30px"
                      height="30px"
                    />
                  </LanguageSwitch>
                </LanguageSwitchContainer>
              </Row>
            </Col>
            <Col>
              <FooterContainer>
                <SocialLink
                  href=""
                  src="github.svg"
                />
                <SocialLink
                  href=""
                  src="twitter.svg"
                />
                <SocialLink
                  href=""
                  src="linkedin.svg"
                />
              </FooterContainer>
            </Col>
          </Row>
          <Row>
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="101px"
                  height="64px"
                />
              </LogoContainer>
            </NavLink>
          </Row>
        </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
