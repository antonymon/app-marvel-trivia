import { Row } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import { ErrorButtonBack, ErrorDiv } from "./styles";

const Error = (props) => {
  return (
    <ErrorDiv>
      <h1>
        {props.t("Error404")}
      </h1>
      <Row className="alignCenter">
        <ErrorButtonBack to='/' className='backBtn'>
          {props.t("Home")}
        </ErrorButtonBack>
      </Row>
    </ErrorDiv>
  );
};

export default withTranslation()(Error);
