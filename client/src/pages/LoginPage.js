// React imports
import React, { useState } from "react";

// Material UI imports
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

// Routing imports
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

// Form related imports
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { toast } from "react-toastify";

// Custom hooks and components
import useAuth from "../hooks/useAuth";
import GoogleButton from "../components/GoogleButton";

// OAuth
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
      try {
        const from = location.state?.from?.pathname || "/";
        // console.log("Trigger Google Login");
        await auth.loginWithGoogle(tokenResponse, () => {
          navigate(from, { replace: true });
        });
      } catch (error) {
        reset();
        setError("responseError", error);
        toast.error("Login failed. Please try again.");
      }
    },
    onError: ({ error, error_description, error_uri }) => {
      console.error("Error:", error);
      if (error_description) {
        console.error("Error description:", error_description);
      }
      if (error_uri) {
        console.error("Error URI:", error_uri);
      }
      toast.error("Login failed. Please try again.");
    }
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
            loading={isSubmitting}
          >
            Login
          </LoadingButton>

          {/* Google login */}

          <GoogleButton onClick={googleLogin} />

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
