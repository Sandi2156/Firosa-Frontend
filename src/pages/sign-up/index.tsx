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
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";

import { signUp } from "../../api/authenticate";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type SignUpResponse = {
  success: boolean;
  message: string;
  data: null;
  errorCode?: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmpassword") as string;

    if (password !== confirmPassword) {
      setIsError(true);
      setErrorText("Password is not matching!");

      return;
    }

    const res: SignUpResponse = await signUp(email, password, "SELF");

    if (!res.success) {
      setIsError(true);
      setErrorText(res.message);
    } else return navigate("/sign-in");
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-nam"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
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
