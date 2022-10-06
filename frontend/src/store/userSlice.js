import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { user } = action.payload;
      state.user = user;

      state.isLoggedIn = true;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
