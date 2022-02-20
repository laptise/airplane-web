import { Box, Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { ServerSideProps } from "../../components/OnServer";
import UserPage, { SubMenuHeader, UserMenu } from "../../components/user";
import { useAuthState } from "../../store/auth/selector";

const FriendList: React.FC = () => {
  const search = (msg: string) => {};
  return (
    <Stack className="friends subMenu" direction={"column"}>
      <SubMenuHeader title="メッセージ" search={search} />
    </Stack>
  );
};

const Chat: React.FC = () => {
  return (
    <Stack className="chat">
      <FriendList />
    </Stack>
  );
};

/**ダッシュボード画面 */
const UserHome: AuthFC = ({ user }) => {
  const { auth } = useAuthState();
  return (
    <UserPage currentState={UserMenu.Chat}>
      <Chat></Chat>
    </UserPage>
  );
};

export default UserHome;
