import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/index.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
