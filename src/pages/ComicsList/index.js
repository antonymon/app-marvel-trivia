import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ComicsListComponent = lazy(() => import("../../components/ComicsList"));

const ComicsList = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <ComicsListComponent {...props} />
    </Container>
  );
};

export default ComicsList;
