import { Stack } from "@mui/material";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { SearchSubMenu } from ".";
import Plan from "../../firebase/firestore/plan";
import CircleBox from "../circleBox";

const PlanInfo: React.FC<{ plan: Plan }> = ({ plan }) => {
  const { id, name, price, note } = plan;
  return (
    <Stack direction={"column"}>
      <Stack direction={"row"} justifyContent="space-between">
        <span>{name}</span>
        <span>{price.toLocaleString()}</span>
      </Stack>
      <span>{note}</span>
    </Stack>
  );
};

const OwningPlans: UserInfoFC = ({ user }) => {
  const [plans, setPlans] = useState([] as Plan[]);
  useEffect(() => {
    Plan.getFromUid(user.id).then((data) => {
      setPlans(data);
    });
  }, [user]);
  return (
    <Stack className="plans" direction={"column"} style={{ width: "100%" }} gap={1}>
      {plans?.length > 0 && <span>プラン一覧</span>}
      {plans.map((x) => (
        <PlanInfo key={x.id} plan={x} />
      ))}
    </Stack>
  );
};

const PremiumUserCandidate: UserInfoFC = ({ user }) => {
  const { name, note } = user;
  return (
    <Stack className="premUserInfo" direction={"column"} alignItems="center">
      <Stack className="pUserBadge" direction={"row"} alignItems="center" spacing={1} style={{ width: "100%" }}>
        <CircleBox size={40} />
        <Stack direction={"column"} flex={1}>
          <small>アーティスト</small>
          <h3>{user.name}</h3>
          {note}
        </Stack>
        <small style={{ marginLeft: "auto", alignSelf: "flex-start" }}>{format(new Date(user.createdAt), "yyyy年M月d日")}から利用</small>
      </Stack>
      <OwningPlans user={user} />
    </Stack>
  );
};

const Search: React.FC = () => {
  const toViewUserState = useState<UserCol | null>(null);
  const [toViewUser, setToViewUser] = toViewUserState;
  return (
    <Stack className="searchUser" direction={"row"}>
      <SearchSubMenu toViewUserState={toViewUserState} picking={toViewUser} />
      {toViewUser && <PremiumUserCandidate user={toViewUser} />}
    </Stack>
  );
};

export default Search;
