import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../service/User-Service";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userSlice";
import styled from "styled-components";
import myToaster from "../helper/myToaster";

const Wrapper = styled.div`
  align-items: center;
  background-color: aliceblue;
  justify-content: center;
`;

export default React.memo(() => {
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const userData = await loginUser({ authorName, password });
      if(userData?.status == 401){
        myToaster(userData?.message  , 1, 'unauthorized user found')
        return
      }
      myToaster('Login successfull' , 2, 'use login')
      dispatch(setUserInfo(userData));
      navigate("/editProfile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
});
