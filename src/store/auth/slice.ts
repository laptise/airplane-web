import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
