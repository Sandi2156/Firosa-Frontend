import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/index.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { RouterProvider } from "react-router-dom";
import config from "./config/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={config.GOOGLE_OAUTH_CLIENT_ID}>
    <Provider store={store}>
      <RouterProvider router={router} />

      <App />
    </Provider>
  </GoogleOAuthProvider>
);
