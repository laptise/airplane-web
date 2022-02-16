import { faFeed, faPaperPlane, faSearch, faSoccerBall, faTimeline, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import App from "../../components/App";
import { ServerSideProps } from "../../components/OnServer";
const SelfBadge: AuthFC = ({ user }) => {
  const { email } = user;
  return (
    <Stack className="profile" direction={"column"} alignItems="center" spacing={2}>
      <div className="iconBox"></div>
      <Stack>
        <h3>{user.name}</h3>
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

interface LeftBarProps {
  user: AuthUser;
  menuState: State<UserMenu>;
}

const LeftBar: React.FC<LeftBarProps> = ({ user, menuState }) => {
  const [menu, setMenu] = menuState;
  return (
    <Stack className="leftBar" spacing={2}>
      <SelfBadge user={user} />
      <Stack className="userMenu" direction={"column"} flex={1} justifyContent="space-around">
        <a onClick={() => setMenu(UserMenu.Chat)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faPaperPlane} size={"lg"} />
            チャット
          </Stack>
        </a>
        <a onClick={() => setMenu(UserMenu.Feed)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faTimeline} size={"lg"} />
            フィード
          </Stack>
        </a>
        <a onClick={() => setMenu(UserMenu.Soccer)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faSoccerBall} size={"lg"} />
            サッカー
          </Stack>
        </a>
        <a onClick={() => setMenu(UserMenu.Search)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faSearch} size={"lg"} />
            検索
          </Stack>
        </a>
      </Stack>
    </Stack>
  );
};

enum UserMenu {
  Chat,
  Feed,
  Soccer,
  Search,
}

const Chat: React.FC = () => {
  return <Stack>chat</Stack>;
};

const Feed: React.FC = () => {
  return <Stack>feed</Stack>;
};

const Soccer: React.FC = () => {
  return <Stack>soccer</Stack>;
};

const Search: React.FC = () => {
  return <Stack>seach</Stack>;
};

const ContextBody: React.FC<LeftBarProps> = ({ user, menuState }) => {
  const [currentMenu, setCurrentMenu] = menuState;
  return (
    <Stack className="contextBody">
      {currentMenu === UserMenu.Chat && <Chat />}
      {currentMenu === UserMenu.Feed && <Feed />}
      {currentMenu === UserMenu.Soccer && <Soccer />}
      {currentMenu === UserMenu.Search && <Search />}
    </Stack>
  );
};

const UserHome: AuthFC = ({ user }) => {
  const currentMenuState = useState(UserMenu.Chat);
  const [currentMenu, setCurrentMenu] = currentMenuState;
  console.log(currentMenu);
  return (
    <App headerClass="user" userName={user?.name} bodyId="userDashboard" title="ホーム">
      <>
        <LeftBar user={user} menuState={currentMenuState} />
        <ContextBody user={user} menuState={currentMenuState} />
      </>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default UserHome;
