import { faPaperPlane, faSearch, faSoccerBall, faStream, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Link, Stack } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { tokenCheck, tokenLogout } from "../../firebase/auth";
import { useAuthState } from "../../store/auth/selector";
import authSlice from "../../store/auth/slice";
import App from "../App";
import BlackSheet from "../blackSheet";
import nookies from "nookies";

export enum UserMenu {
  Chat,
  Feed,
  Soccer,
  Search,
  PlanManagement,
}

export const SubMenu: React.FC = ({ children }) => (
  <Stack className="subMenu" direction={"column"}>
    {children}
  </Stack>
);

export const SubMenuHeader: React.FC<{ title: string; search: (txt: string) => void }> = ({ title, search }) => {
  const [value, setValue] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(value);
  };
  return (
    <form ref={form} onSubmit={submit}>
      <Stack className="header" direction={"column"}>
        <h4 className="title">{title}</h4>
        <Stack className="inputArea" direction={"row"}>
          <input value={value} onChange={(e) => setValue(e.target.value)} className="radiusInput" autoComplete={"off"} />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Stack>
      </Stack>
    </form>
  );
};

export const SearchSubMenu: React.FC<{ toViewUserState: State<UserCol | null>; picking: UserCol | null }> = ({ toViewUserState, picking }) => {
  const [toViewUser, setToViewUser] = toViewUserState;
  const [datas, setDatas] = useState([] as UserCol[]);
  const search = async (msg: string) => {
    const res = await axios.get<UserCol[]>(`/api/v1/premiumUser/?q=${msg}`);
    setDatas(res.data);
  };

  return (
    <SubMenu>
      <SubMenuHeader title="検索" search={search} />
      {datas.map((x) => (
        <a key={x.id} onClick={() => setToViewUser(x)}>
          <Stack className="singlePremiumUser" direction="row" alignItems={"center"} spacing={1}>
            <Box className="thumb" width={30} height={30}></Box>
            <span>{x.name}</span>
          </Stack>
        </a>
      ))}
    </SubMenu>
  );
};

/**自分の情報バッジ */
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

/**左側のメニューエリア */
const LeftBar: React.FC<LeftBarProps> = ({ user, menuState }) => {
  const router = useRouter();
  const [menu, setMenu] = menuState;
  return (
    <Stack className="leftBar" spacing={2}>
      <SelfBadge user={user} />
      <Stack className="userMenu" direction={"column"} flex={1} justifyContent="space-around">
        <a onClick={() => router.push("/user")}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faStream} size={"lg"} />
            フィード
          </Stack>
        </a>
        <a onClick={() => router.push("/user/message")}>
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
        <a onClick={() => router.push("/user/search")}>
          <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
            <FontAwesomeIcon icon={faSearch} size={"lg"} />
            検索
          </Stack>
        </a>
        {user.isPremium && (
          <a onClick={() => setMenu(UserMenu.PlanManagement)}>
            <Stack className="menuItem" direction={"column"} alignItems="center" spacing={1}>
              <FontAwesomeIcon icon={faStream} size={"lg"} />
              プラン管理
            </Stack>
          </a>
        )}
      </Stack>
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

interface LeftBarProps {
  user: AuthUser;
  menuState: State<UserMenu>;
}

/**画面のメインコンテンツのコンテナー */
const ContextBody: React.FC<LeftBarProps> = ({ user, menuState, children }) => {
  const [currentMenu, setCurrentMenu] = menuState;
  return <Stack className="contextBody">{children}</Stack>;
};

const UserPage: React.FC<{ currentState: UserMenu }> = ({ children, currentState }) => {
  const router = useRouter();
  const { auth } = useAuthState();
  const dispatch = useDispatch();
  const { login } = authSlice.actions;
  useEffect(() => {
    if (!auth) {
      tokenCheck()
        .then((auth) => {
          dispatch(login(auth));
        })
        .catch(() => {
          tokenLogout().finally(() => router.replace("/login"));
        });
    }
  }, []);
  const currentMenuState = useState(UserMenu.Chat);
  const [currentMenu, setCurrentMenu] = currentMenuState;
  const subscribeSettingModal = useState(false);
  const [subscribeModalViewState, setSubscribeModalViewState] = subscribeSettingModal;
  return (
    <App headerClass="user" onSubscribeOpen={() => setSubscribeModalViewState(true)} userName={auth?.name} bodyId="userDashboard" title="ホーム">
      <>
        <SubscribeSettingModal closeModal={() => setSubscribeModalViewState(false)} viewState={subscribeSettingModal} />
        {auth && (
          <>
            <LeftBar user={auth} menuState={currentMenuState} />
            <ContextBody user={auth} menuState={currentMenuState}>
              {children}
            </ContextBody>
          </>
        )}
      </>
    </App>
  );
};

export default UserPage;
