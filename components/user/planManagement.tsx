import { Stack } from "@mui/material";
import { SubMenu, SubMenuHeader } from ".";

const PlanManagement = () => {
  return (
    <SubMenu>
      <SubMenuHeader
        title="プラン管理"
        search={(text) => {
          console.log(text);
        }}
      />
    </SubMenu>
  );
};
export default PlanManagement;
