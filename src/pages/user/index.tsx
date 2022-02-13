import { GetServerSideProps } from "next";
import App from "../../components/App";
import { OnServer, ServerSideProps } from "../../components/OnServer";
import { Utl } from "../../components/utils";

const UserHome = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="home" title="ホーム">
      <div>da</div>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default UserHome;
