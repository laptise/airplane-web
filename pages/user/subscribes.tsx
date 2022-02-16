import { GetServerSideProps } from "next";
import App from "../../components/App";
import { ServerSideProps } from "../../components/OnServer";

const Subscribes: AuthFC = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="subscribes" title="ホーム">
      <>プラン</>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default Subscribes;
