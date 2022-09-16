import { lazy } from "react";
import { useSelector } from "react-redux";
import LeaderboardContent from "../../content/LeaderboardContent.json";


const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Leaderboard = () => {

  const user = useSelector((state) => state.user);
  console.log("Leaderboard: ", user);

  return (
    <Container>
      <ScrollToTop />
      <MiddleBlock
        title={LeaderboardContent.title}
        content={LeaderboardContent.text}
        button={LeaderboardContent.button}
        id={"leaderboard"}
      />
    </Container>
  );
};

export default Leaderboard;
