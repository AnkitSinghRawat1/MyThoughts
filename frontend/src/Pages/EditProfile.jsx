import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import myToaster from "../helper/myToaster";
import { logoutUser, updateProfile } from "../service/User-Service";
import { setUserInfo } from "../store/userSlice";

const StyleContainer = styled.div`
  .imageContainer {
    height: 110px;
    width: 110px;
    margin: auto;
  }
  .profilePicture {
    border-radius: 80%;
    height: 90%;
    width: 90%;
    object-fit: cover;
  }
  .stack {
    align-items: "center";
    justify-content: center;
    margin-top: 200px;
  }
  #avatarInput {
    display: none;
  }
  label {
    display: inline-block;
    cursor: pointer;
    color: #2e2e2f;
    font-size: 16px;
    text-transform: capitalize;
    font-weight: bold;
  }
`;

export default React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [authorName, setAuthorName] = useState('')
  const [aboutMe, setAboutMe] = useState('')

  const logout = async () => {
    const user = await logoutUser();
    dispatch(setUserInfo(user));

    // navigate to login page

    navigate("/");
  };

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      // dispatch(setAvatar(reader.result));
    };
  }

  const saveProfileData = async () => {
    console.log('Api call for save profile info')
    await updateProfile({authorName, aboutMe, avatar: image })
    myToaster('Profile updated', 2 , 'user profile')
  };
  
  return (
    <StyleContainer>
      <Stack className="stack" direction="column" spacing={2}>
        <div className="imageContainer">
          <img className="profilePicture" src={image} alt="profilePicture" />
        </div>
        <div>
          <input
            id="avatarInput"
            onChange={captureImage}
            type="file"
            accept="image/png image/jpeg image/jpg"
          />
          <label htmlFor="avatarInput">Select your Picture</label>
        </div>
        <TextField
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          id="standard-basic"
          label="Author Name"
          variant="standard"
        />
        <TextField
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          id="standard-basic2"
          label="about me"
          variant="standard"
        />
        <Button onClick={saveProfileData} variant="contained">
          Save
        </Button>
      </Stack>
      <button onClick={logout}>logout</button>
    </StyleContainer>
  );
});
