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
      const { user, loggedIn } = action.payload;
      state.user = user;
      state.isLoggedIn = loggedIn;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
