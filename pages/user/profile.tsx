import { GetServerSideProps } from "next";
import App from "../../components/App";
import { ServerSideProps } from "../../components/OnServer";

const Profile: AuthFC = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="userProfile" title="プロフィール">
      <>プラン</>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default Profile;
