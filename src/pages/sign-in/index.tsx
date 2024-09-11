import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";
import { useAppDispatch } from "../../app/hooks";
import { logIn, logOut } from "../../app/authSlice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { signIn, signUp } from "../../api/authenticate";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

type SignInResponse = {
  success: boolean;
  message: string;
  data: null;
  errorCode?: string;
};

export default function SignIn() {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const res: SignInResponse = await signIn(email, password, "SELF");

    if (!res.success) {
      setIsError(true);
      setErrorText(res.message);
      dispatch(logOut());
    } else {
      dispatch(logIn());
      navigate("/");
    }
  };

  const signedInByGoogleOnSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      setIsError(true);
      setErrorText("Google Authentication Error!");

      return;
    }

    const decodedString: {
      email: string;
      given_name: string;
      family_name: string;
    } = jwtDecode(response.credential);

    await signUp(
      decodedString.email,
      "",
      "GOOGLE",
      decodedString.given_name,
      decodedString.family_name
    );

    const res: SignInResponse = await signIn(decodedString.email, "", "GOOGLE");

    if (!res.success) {
      setIsError(true);
      setErrorText(res.message);
      dispatch(logOut());
    } else {
      dispatch(logIn());
      navigate("/");
    }
  };

  const signedInByGoogleOnError = () => {
    setIsError(true);
    setErrorText("Google Authentication Error!");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        <Fab
          size="medium"
          aria-label="add"
          color="primary"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </Fab>
      </Box>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {isError && (
              <Alert severity="error" style={{ margin: "10px" }}>
                {errorText}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <GoogleLogin
              onSuccess={signedInByGoogleOnSuccess}
              onError={signedInByGoogleOnError}
            />

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8, mb: 4 }}
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
