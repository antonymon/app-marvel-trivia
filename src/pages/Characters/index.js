import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const CharactersComponent = lazy(() => import("../../components/Characters"));

const Characters = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <CharactersComponent {...props} />
    </Container>
  );
};

export default Characters;
