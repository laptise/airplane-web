import { Stack } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";
import App from "../../components/App";
import { ServerSideProps } from "../../components/OnServer";
import { FloatingMenu, LeftBar, UserMenu } from "../../components/user";

const SinglePlan: AuthFC = ({ user }) => {
  console.log(user);
  return (
    <App bodyId="userDashboard" headerClass="user" title="da" userName={user.name}>
      <FloatingMenu user={user} />
      <div>dsa</div>
    </App>
  );
};

export const getServerSideProps: GetServerSideProps = ServerSideProps.UserOnly;

export default SinglePlan;
