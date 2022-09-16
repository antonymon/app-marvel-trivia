import { lazy } from "react";
import { useSelector } from "react-redux";
import IntroContent from "../../content/IntroContent.json";
import LeaderboardContent from "../../content/LeaderboardContent.json";
import SigInContent from "../../content/SigInContent.json";


const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const SingInBlock = lazy(() => import("../../components/SigInBlock"));

const Home = () => {

  const user = useSelector((state) => state.user);
  console.log("Home: ", user);

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
      {
        user?.accessToken ? null
          :
          (
            <SingInBlock
              title={SigInContent.title}
              content={SigInContent.text}
              button={SigInContent.button}
              id={"sigin"}
            />
          )

      }
    </Container>
  );
};

export default Home;
