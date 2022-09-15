import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ComicsComponent = lazy(() => import("../../components/Comics"));

const Comics = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <ComicsComponent {...props} />
    </Container>
  );
};

export default Comics;
