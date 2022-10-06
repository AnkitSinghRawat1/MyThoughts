import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../service/User-Service";
import { setUserInfo } from "../store/userSlice";

export default React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    const user = await logoutUser();
    dispatch(setUserInfo(user));

    // navigate to login page

    navigate("/");
  };
  return (
    <div>
      EditProfile
      <button onClick={logout}>logout</button>
    </div>
  );
});
