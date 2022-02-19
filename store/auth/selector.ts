import { useSelector } from "react-redux";

export const useAuthState = () => useSelector((state: { auth: UserCol }) => state);
