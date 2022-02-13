import { GetServerSideProps } from "next";
import App from "../../components/App";
import { OnServer } from "../../components/OnServer";
import { Utl } from "../../components/utils";

const UserHome = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="home" title="ホーム">
      <div>da</div>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await OnServer.getClientFromToken(ctx);
  if (!user)
    return {
      props: { user: null },
      redirect: {
        destination: "/login",
      },
    };
  // DashboardPageにpropsを渡して遷移する
  else
    return {
      props: { user: Utl.JSONParse(user) },
    };
};

export default UserHome;
