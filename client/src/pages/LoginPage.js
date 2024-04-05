import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useTheme } from "@mui/material/styles";
import { useGoogleLogin } from "@react-oauth/google";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const Mode = theme.palette.mode;

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("🚀 ~ response ~ tokenResponse:", tokenResponse);
      try {
        const from = location.state?.from?.pathname || "/";

        console.log("Trigger Google Login");
        await auth.loginWithGoogle(tokenResponse, () => {
          // Changed from tokenResponse.code to tokenResponse.access_token
          navigate(from, { replace: true });
        });
      } catch (error) {
        reset();
        setError("responseError", error);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <FTextField name="email" label="Email address" variant="standard" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
          <Link component={RouterLink} variant="subtitle2" to="/">
            Forgot password?
          </Link>
        </Stack>

        <Stack spacing={3}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            // color="secondary"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>

          {/* Google login */}

          <Button
            fullWidth
            size="large"
            onClick={googleLogin}
            sx={{
              backgroundColor: "#4285F4",
              color: "white",
              "&:hover": {
                backgroundColor: "#2F83CD",
                transform: "scale(1.05)", // Add scale transformation on hover
              },
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.25)",
              transition: "transform 0.3s ease-in-out", // Add transition for smooth animation
            }}
          >
            Log In with Google
          </Button>

          <Alert
            severity="info"
            style={{
              backgroundColor: Mode === "dark" ? "#FFDACB" : "#E9FCD4",
              color: Mode === "dark" ? "#000" : "#333",
            }}
          >
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
