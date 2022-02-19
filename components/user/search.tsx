import { Stack } from "@mui/material";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { SearchSubMenu } from ".";
import CircleBox from "../circleBox";

const OwningPlans: UserInfoFC = ({ user }) => {
  const [plans, setPlans] = useState([] as any[]);
  //   useEffect(, []);
  return <Stack className="plans" direction={"column"}></Stack>;
};

const PremiumUserCandidate: UserInfoFC = ({ user }) => {
  return (
    <Stack className="premUserInfo" direction={"column"} alignItems="center">
      <Stack className="pUserBadge" direction={"row"} alignItems="center" spacing={1} style={{ width: "100%" }}>
        <CircleBox size={40} />
        <Stack direction={"column"} flex={1}>
          <small>アーティスト</small>
          <h3>{user.name}</h3>
        </Stack>
        <small style={{ marginLeft: "auto", alignSelf: "flex-start" }}>{format(new Date(user.createdAt), "yyyy年M月d日")}から利用</small>
      </Stack>
      <OwningPlans user={user} />
    </Stack>
  );
};

const Search: React.FC = () => {
  const toViewUserState = useState(null as UserCol);
  const [toViewUser, setToViewUser] = toViewUserState;
  return (
    <Stack className="searchUser" direction={"row"}>
      <SearchSubMenu toViewUserState={toViewUserState} picking={toViewUser} />
      {toViewUser && <PremiumUserCandidate user={toViewUser} />}
    </Stack>
  );
};

export default Search;
