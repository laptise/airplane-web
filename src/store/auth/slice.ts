import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";
import Users, { UserEntity } from "../../firebase/firestore/user";

export const initialState: UserEntity | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<UserEntity | null>) => ({
      ...action.payload,
    }),
    logout: () => initialState,
  },
});

export default authSlice;
