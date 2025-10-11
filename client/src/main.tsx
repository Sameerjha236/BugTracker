import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { App as AntdApp } from "antd";
import App from "./App";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Project = lazy(() => import("./pages/Project"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const IssuePage = lazy(() => import("./pages/IssuePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/project/:id",
        element: (
          <Suspense fallback={<div>Loading Project...</div>}>
            <Project />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading Auth Page...</div>}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: "/issue/:id",
        element: (
          <Suspense fallback={<div>Loading Issue Page...</div>}>
            <IssuePage />
          </Suspense>
        ),
      },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntdApp>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AntdApp>
  </React.StrictMode>
);
