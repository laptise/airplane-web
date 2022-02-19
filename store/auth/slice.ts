import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserCol | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<UserCol | null>) => ({
      ...action.payload,
    }),
    logout: () => initialState,
  },
});

export default authSlice;
