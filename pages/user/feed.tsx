import { Box, Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { ServerSideProps } from "../../components/OnServer";
import UserPage, { SubMenuHeader, UserMenu } from "../../components/user";

const FriendList: React.FC = () => {
  const search = (msg: string) => {
    console.log(msg);
  };
  return (
    <Stack className="friends subMenu" direction={"column"}>
      <SubMenuHeader title="メッセージ" search={search} />
    </Stack>
  );
};

const Feed: React.FC = () => {
  return <Stack className="feed">まだフィードがありません!</Stack>;
};

/**ダッシュボード画面 */
const UserHome: AuthFC = ({ user }) => {
  return (
    <UserPage currentState={UserMenu.Feed}>
      <Feed></Feed>
    </UserPage>
  );
};

export default UserHome;
