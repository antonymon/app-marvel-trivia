import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ErrorComponent = lazy(() => import("../../components/Error"));

const Error = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <ErrorComponent {...props} />
    </Container>
  );
};

export default Error;
