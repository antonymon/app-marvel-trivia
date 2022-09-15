import { Row } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import { ErrorButtonBack } from "./styles";

const Error = (props) => {
  return (
    <Row>
      <h1>
        {props.t("Error404")}
      </h1>
      <Row className="alignCenter">
        <ErrorButtonBack to='/' className='backBtn'>
          {props.t("Home")}
        </ErrorButtonBack>
      </Row>
    </Row>
  );
};

export default withTranslation()(Error);
