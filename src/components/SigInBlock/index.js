import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import Login from "../Login";

const SigInBlock = (props) => {
  return (
    <Slide direction="up">
      <Login id={props.id} />
    </Slide>

  );
};

export default withTranslation()(SigInBlock);
