import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

export enum UserMenu {
  Chat,
  Feed,
  Soccer,
  Search,
}

export const SubMenuHeader: React.FC<{ title: string; search: (txt: string) => void }> = ({ title, search }) => {
  const [value, setValue] = useState("");
  const form = useRef<HTMLFormElement>();
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

export const SearchSubMenu: React.FC<{ toViewUserState: State<UserCol>; picking?: UserCol }> = ({ toViewUserState, picking }) => {
  const [toViewUser, setToViewUser] = toViewUserState;
  const [datas, setDatas] = useState([] as UserCol[]);
  const search = async (msg: string) => {
    const res = await axios.get<UserCol[]>(`/api/v1/premiumUser/?q=${msg}`);
    setDatas(res.data);
  };

  return (
    <Stack className="subMenu" direction={"column"}>
      <SubMenuHeader title="検索" search={search} />
      {datas.map((x) => (
        <a onClick={() => setToViewUser(x)}>
          <Stack className="singlePremiumUser" key={x.id} direction="row" alignItems={"center"} spacing={1}>
            <Box className="thumb" width={30} height={30}></Box>
            <span>{x.name}</span>
          </Stack>
        </a>
      ))}
    </Stack>
  );
};
