import { GetServerSideProps } from "next";
import App from "../../components/App";
import { OnServer } from "../../components/OnServer";

const UserHome = () => {
  return (
    <App userName="dd" bodyId="home" title="ホーム">
      <div>da</div>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = await OnServer.getClientFromToken(ctx);
  return { props: { user: user ? JSON.parse(JSON.stringify(user)) : null } }; // DashboardPageにpropsを渡して遷移する
};

export default UserHome;
