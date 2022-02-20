import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserCol | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login<UserCol>(_: any, action: PayloadAction<UserCol>) {
      return action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export default authSlice;
