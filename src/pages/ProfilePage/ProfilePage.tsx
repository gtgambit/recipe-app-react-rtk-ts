import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logout } from "../../store/auth/authSlice";
import { auth } from "../../utils/firebase";

import { classes } from "./ProfilePageStyle";
import user from "../../assets/user.png";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { token, email } = useAppSelector((state) => state.auth);

  const onClickLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <div className="container">
        <Card sx={classes.card}>
          <CardMedia
            sx={classes.media}
            component="img"
            src={user}
            alt="Profile picture"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              sx={classes.title}>
              {email}
            </Typography>
            <LoadingButton
              onClick={onClickLogout}
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="outlined"
              sx={{ width: "100%", mt: 4 }}>
              Sign out
            </LoadingButton>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProfilePage;
