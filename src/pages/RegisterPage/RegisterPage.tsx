import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";

import { setAuthData } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { schema } from "../LoginPage/schema";
import { auth } from "../../utils/firebase";

import backgroundImg from "../../assets/register.jpg";

interface IFormInputs {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const token = useAppSelector((state) => state.auth.token);

  const signUp = async (email: string, password: string) => {
    try {
      const { user }: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToken = user.refreshToken;
      const userEmail = user.email;
      dispatch(setAuthData({ userToken, userEmail }));
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.slice(10);
        setError(`⚠ ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: IFormInputs) => {
    setError("");
    setLoading(true);
    signUp(data.email, data.password);
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container component="main" sx={{ height: "calc(100vh - 108px)" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, width: "270px" }}>
            <TextField
              id="email"
              {...register("email")}
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
            />
            <Typography
              component="p"
              sx={{ color: "red", fontSize: 14, margin: "5px 0" }}>
              {errors.email?.message ? errors.email?.message : " "}
            </Typography>

            <TextField
              id="password"
              {...register("password")}
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
            />
            <Typography
              component="p"
              sx={{ color: "red", fontSize: 14, margin: "5px 0" }}>
              {errors.password?.message ? errors.password?.message : " "}
            </Typography>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Promo"
            />
            <Typography
              component="p"
              sx={{ color: "red", fontSize: 14, margin: "2px 0" }}>
              {error || ""}
            </Typography>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingIndicator="Loading…"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              <span>Sign Up</span>
            </LoadingButton>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">Already Registered? Sign In!</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
