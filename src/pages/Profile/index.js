import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ProfileComponent = lazy(() => import("../../components/Profile"));

const Profile = (props) => {
  return (
    <Container>
      <ScrollToTop />
      <ProfileComponent {...props} />
    </Container>
  );
};

export default Profile;
