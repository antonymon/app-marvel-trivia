import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const PlayComponent = lazy(() => import("../../components/Play"));

const Play = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <PlayComponent {...props} />
    </Container>
  );
};

export default Play;
