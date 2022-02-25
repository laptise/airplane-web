import { Box, Button, Stack, Tab, Tabs, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OnServer, ServerSideProps } from "../../components/OnServer";
import UserPage, { SubMenuHeader, UserMenu } from "../../components/user";
import Search from "../../components/user/search";

/**ダッシュボード画面 */
const UserHome: AuthFC = () => {
  return (
    <UserPage currentState={UserMenu.Search}>
      <Search />
    </UserPage>
  );
};

export default UserHome;
