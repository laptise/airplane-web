import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SubMenu, SubMenuHeader } from ".";
import Plan from "../../firebase/firestore/plan";
import { ServerSideProps } from "../OnServer";

const PlanManagement: AuthFC = ({ user }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  useEffect(() => {
    Plan.getFromUid(user.uid).then((plans) => setPlans(plans));
  }, [user]);
  return (
    <Stack style={{ padding: 30 }}>
      <h2>プラン管理</h2>
      <Stack direction={"row"} justifyContent="space-between">
        <span style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>プラン一覧</span>
        <button>新規プラン 追加</button>
      </Stack>
      {plans?.length > 0 ? plans.map((x) => <span key={x.id}>{x.name}</span>) : <h3>まだプランがありません</h3>}
    </Stack>
  );
};

export default PlanManagement;
