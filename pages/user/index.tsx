import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Stack, Tab, Tabs, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import App from "../../components/App";
import { ServerSideProps } from "../../components/OnServer";
const SelfBadge: AuthFC = ({ user }) => {
  const { email } = user;
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

const PremUsers: AuthFC = ({ user }) => {
  return <Stack className="premUsers"></Stack>;
};

enum ContextTabs {
  Feed,
}

const ContextTab: AuthFC = ({ user }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Stack className="contextTab">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="basic tabs example">
          <Tab label="フィード" value={"1"} />
          <Tab label="保存済み" value={"2"} />
        </TabList>
        <TabPanel value={"1"}>フィード</TabPanel>
        <TabPanel value={"2"}>保存済み</TabPanel>
      </TabContext>
    </Stack>
  );
};

const UserHome: AuthFC = ({ user }) => {
  return (
    <App userName={user?.name} bodyId="userDashboard" title="ホーム">
      <>
        <SelfBadge user={user} />
        <Stack className="searchNewPrem">
          <TextField size="small" label="認定ユーザーを検索" />
        </Stack>
        <PremUsers user={user} />
        <ContextTab user={user} />
      </>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default UserHome;
