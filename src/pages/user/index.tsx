import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from "firebase/auth";
import { GetServerSideProps } from "next";
import App from "../../components/App";
import { OnServer, ServerSideProps } from "../../components/OnServer";

const SelfBadge: AuthFC = ({ user }) => {
  const email = getAuth().currentUser?.email;
  return (
    <Stack className="profile" direction={"row"} spacing={1}>
      <div className="iconBox"></div>
      <Stack>
        <h5>{user.name}</h5>
        <small>{email}</small>
      </Stack>
    </Stack>
  );
};

const UserHome: AuthFC = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="userDashboard" title="ホーム">
      <>
        <SelfBadge user={user} />
        <Stack className="searchNewPrem">
          <TextField label="da" />
        </Stack>
        <Stack className="premUsers">hi</Stack>
        <Stack className="feed">feed</Stack>
      </>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default UserHome;
