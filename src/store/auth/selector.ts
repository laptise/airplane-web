import { useSelector } from "react-redux";
import { UserEntity } from "../../firebase/firestore/user";

export const useAuthState = () => useSelector((state: { auth: UserEntity }) => state);
