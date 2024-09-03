import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { logIn, logOut } from "./app/authSlice";
import { validateSession } from "./api/authenticate";

export default function App() {
  const dispatch = useAppDispatch();

  interface ValidateSessionApiResponse {
    success: boolean;
  }

  const validate = async () => {
    const res: ValidateSessionApiResponse = await validateSession();

    if (res.success) dispatch(logIn());
    else dispatch(logOut());
  };

  useEffect(() => {
    validate();
  });

  return <></>;
}
