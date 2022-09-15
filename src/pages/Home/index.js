import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import LeaderboardContent from "../../content/LeaderboardContent.json";
import SigInContent from "../../content/SigInContent.json";

const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const SingInBlock = lazy(() => import("../../components/SigInBlock"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="all-comic.svg"
        id="intro"
      />
      <MiddleBlock
        title={LeaderboardContent.title}
        content={LeaderboardContent.text}
        button={LeaderboardContent.button}
        id={"leaderboard"}
      />
      <SingInBlock
        title={SigInContent.title}
        content={SigInContent.text}
        button={SigInContent.button}
        id="sigin"
      />
    </Container>
  );
};

export default Home;
