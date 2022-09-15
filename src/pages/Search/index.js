import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const SearchResult = lazy(() => import("../../components/SearchResult"));

const Search = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <SearchResult {...props} />
    </Container>
  );
};

export default Search;
