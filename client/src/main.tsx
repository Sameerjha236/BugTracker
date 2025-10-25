import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { App as AntdApp, message } from "antd";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const IssuePage = lazy(() => import("./pages/IssuePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //  Public route
      {
        path: "/auth",
        element: (
          <Suspense fallback={<div>Loading Auth Page...</div>}>
            <AuthPage />
          </Suspense>
        ),
      },
      //  Protected routes grouped together
      {
        element: <ProtectedRoute />,
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
                <ProjectPage />
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
        ],
      },

      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

const queryClient = new QueryClient({});

// {
//     "email":"s@gmail.com",
//     "password":"Sameer@123"
// }

message.config({
  top: 80,
  duration: 2,
  maxCount: 1,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AntdApp
      message={{
        maxCount: 1,
        top: 80,
        duration: 2,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AntdApp>
  </React.StrictMode>
);
