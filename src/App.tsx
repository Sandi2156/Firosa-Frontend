import { useEffect } from "react";
import { logIn, logOut } from "./app/authSlice";
import { validateSession } from "./api/authenticate";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { closeSnackbar } from "./app/snackBarSlice";

export default function App() {
  const { message, show, type } = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();

  interface ValidateSessionApiResponse {
    success: boolean;
  }

  const validate = async () => {
    const res: ValidateSessionApiResponse = await validateSession();

    if (res.success) dispatch(logIn());
    else dispatch(logOut());
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackbar());
  };

  useEffect(() => {
    validate();
  });

  return (
    <>
      <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={!type ? "error" : type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
