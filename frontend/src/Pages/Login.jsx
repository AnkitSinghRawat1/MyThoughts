import React from "react";
import { Stack, TextField, Button } from "@mui/material";
// import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { loginUser } from "../service/User-Service";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userSlice";

export default React.memo(() => {
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  const login = async () => {
    try {
      const userData = await loginUser({ authorName, password });
      console.log(userData);
      dispatch(setUserInfo(userData));
    } catch (error) {
      console.log(error);
    }
    // navigate('/editProfile')
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "200px",
      }}
    >
      <TextField
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        id="standard-basic"
        label="Author Name"
        variant="standard"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="standard-basic"
        label="Password"
        variant="standard"
      />
      <Button onClick={login} variant="contained">
        Login
      </Button>
    </Stack>
  );
});
