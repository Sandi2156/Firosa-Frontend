import { useState, useEffect, ReactNode } from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { deployProject } from "../../../api/project";
import useSocketConnection from "../../../hooks/useSocketConnection";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";

enum LogCode {
  DEPLOYMENT_INITIATED = "DEPLOYMENT_INITIATED",
  BUILD_STARTED = "BUILD_STARTED",
  BUILDING = "BUILDING",
  BUILD_DATA = "BUILD_DATA",
  BUILD_COMPLETED = "BUILD_COMPLETED",
  DEPLOYMENT_STARTED = "DEPLOYMENT_STARTED",
  DEPLOYING = "DEPLOYING",
  DEPLOYED = "DEPLOYED",
  PROJECT_ENDPOINT = "PROJECT_ENDPOINT",
}

interface DeployProjectResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
    projectSlug: string;
  } | null;
  errorCode?: string;
}

interface BuildLog {
  code: LogCode;
  log: string;
}

export default function Hero() {
  const [gitURL, setGitURL] = useState("");
  const [socket] = useSocketConnection({
    url: import.meta.env.VITE_SERVER_ENDPOINT,
  });
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState<BuildLog>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const deploy = async () => {
    if (!isAuthenticated) {
      return navigate("/sign-in");
    }

    if (!gitURL) {
      setErrorMessage("Give a Proper GitHub Project Link");
      return;
    }
    setErrorMessage("");

    const res: DeployProjectResponse = await deployProject(gitURL);
    setIsLoading(true);
    if (res.success) {
      if (!res.data) {
        setErrorMessage("Deployment failed due to some reason");
        return;
      }

      setRoom(res.data.projectSlug);
      setMessage({
        code: LogCode.DEPLOYMENT_INITIATED,
        log: "",
      });
    } else {
      setIsLoading(false);
      setErrorMessage(res.message);
    }
  };

  useEffect(() => {
    if (!room) return;

    socket.emit("subscribe", `logs:${room}`);
    socket.on("message", (message) => {
      const logMessage = JSON.parse(message);
      setMessage(logMessage);
    });

    return () => {
      socket.off("message");
    };
  }, [room]);

  function GradientCircularProgress() {
    return (
      <>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </>
    );
  }

  function LogMessage() {
    if (!message) return <></>;

    let label: string | ReactNode = "";

    switch (message.code) {
      case LogCode.DEPLOYMENT_INITIATED:
        label = "Deployment Initiated...";
        break;
      case LogCode.BUILD_STARTED:
        label = "Build Started...";
        break;
      case LogCode.BUILDING || LogCode.BUILD_DATA:
        label = "Building...";
        break;
      case LogCode.BUILD_COMPLETED:
        label = "Build Completed...";
        break;
      case LogCode.DEPLOYMENT_STARTED:
        label = "Deployment Started...";
        break;
      case LogCode.DEPLOYED:
        label = "Deployed...";
        break;
      case LogCode.PROJECT_ENDPOINT:
        label = (
          <div>
            your project is ready...
            <a href={message.log} target="_blank">
              <OpenInNewIcon />
            </a>
          </div>
        );
        setIsLoading(false);
        setGitURL("");
        break;
      default:
        label = "default";
    }

    return <Chip label={label} color="success" variant="outlined" />;
  }

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Make Deployment&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: "clamp(3rem, 10vw, 4rem)",
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              easy
            </Typography>
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="medium"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your project link"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter your email address",
              }}
              onChange={(e) => setGitURL(e.target.value)}
              value={gitURL}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={deploy}
              disabled={isLoading}
            >
              Deploy now
            </Button>
          </Stack>

          <Stack
            alignSelf="center"
            direction={{ xs: "column" }}
            justifyContent="center"
            useFlexGap
            spacing={3}
            alignItems="center"
          >
            {errorMessage && (
              <Alert severity="error" style={{ margin: "10px" }}>
                {errorMessage}
              </Alert>
            )}
            {isLoading && <GradientCircularProgress />}
            <LogMessage />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
