import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Homepage from "./Pages/Homepage";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        return redirect("/login");
      }
      return null;
    },
  },

  {
    path: "/login",
    element: <LoginPage></LoginPage>,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage></RegisterPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
