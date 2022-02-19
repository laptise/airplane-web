import { faFeed, faPaperPlane, faSearch, faSoccerBall, faStream, faTimeline, faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FormEvent, useRef, useState } from "react";
import App from "../../components/App";
import BlackSheet from "../../components/blackSheet";
import { ServerSideProps } from "../../components/OnServer";
import { format } from "date-fns";
import Search from "../../components/user/search";
import { SubMenuHeader, UserMenu } from "../../components/user";
const SelfBadge: AuthFC = ({ user }) => {
  const { email } = user;
  return (
    <Stack className="profile" direction={"column"} alignItems="center" spacing={2}>
      <div className="iconBox"></div>
      <Stack>
        <h4>{user.name}</h4>
        <small>{email}</small>
      </Stack>
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
        <a onClick={() => setMenu(UserMenu.Feed)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faStream} size={"lg"} />
            フィード
          </Stack>
        </a>
        <a onClick={() => setMenu(UserMenu.Chat)}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faPaperPlane} size={"lg"} />
            メッセージ
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

const Chat: React.FC = () => {
  return (
    <Stack className="chat">
      <FriendList />
    </Stack>
  );
};

const Feed: React.FC = () => {
  return <Stack className="feed">まだフィードがありません!</Stack>;
};

const Soccer: React.FC = () => {
  return <Stack>soccer</Stack>;
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

const SubscribeSettingModal: React.FC<{ viewState: State<boolean>; closeModal: () => void }> = ({ viewState, closeModal }) => {
  const [isViewing, setIsViewing] = viewState;
  return isViewing ? (
    <>
      <BlackSheet />
      <Stack className="subscribeSettingModal" direction={"column"}>
        <Stack className="header">
          プラン管理
          <button onClick={() => setIsViewing(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Stack>
        <Stack className="body">testset</Stack>
      </Stack>
    </>
  ) : (
    <></>
  );
};

const UserHome: AuthFC = ({ user }) => {
  const currentMenuState = useState(UserMenu.Chat);
  const [currentMenu, setCurrentMenu] = currentMenuState;
  const subscribeSettingModal = useState(false);
  const [subscribeModalViewState, setSubscribeModalViewState] = subscribeSettingModal;
  return (
    <App headerClass="user" onSubscribeOpen={() => setSubscribeModalViewState(true)} userName={user?.name} bodyId="userDashboard" title="ホーム">
      <>
        <SubscribeSettingModal closeModal={() => setSubscribeModalViewState(false)} viewState={subscribeSettingModal} />
        <LeftBar user={user} menuState={currentMenuState} />
        <ContextBody user={user} menuState={currentMenuState} />
      </>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default UserHome;
