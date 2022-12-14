import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
//import { SvgIcon } from "../../../common/SvgIcon";
import { Button } from "../../../common/Button";
import { Fade } from "react-awesome-reveal";
import {
  RightBlockContainer,
  Content,
  ContentWrapper,
  ButtonWrapper,
} from "./styles";

import { useSelector } from "react-redux";

const RightBlock = ({
  title,
  content,
  button,
  icon,
  t,
  id,
}) => {
  const user = useSelector((state) => state.user);
  console.log("RightBlock: ", user);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <RightBlockContainer>
      <Fade direction="right">
        <Row justify="space-between" align="middle" id={id}>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {
                user?.accessToken ? <ButtonWrapper />
                  :
                  (
                    <ButtonWrapper>
                      {typeof button === "object" &&
                        button.map((item, id) => {
                          return (
                            <Button
                              key={id}
                              color={item.color}
                              fixedWidth={true}
                              onClick={() => scrollTo("sigin")}
                            >
                              {t(item.title)}
                            </Button>
                          );
                        })}
                    </ButtonWrapper>
                  )
              }
            </ContentWrapper>
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            {/* <SvgIcon src={icon} width="100%" height="100%" /> */}
            <img src="/img/all-comic.png" alt="" width="100%" height="100%" />
          </Col>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default withTranslation()(RightBlock);
