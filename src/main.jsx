import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskHome from "./Components/TaskHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./Components/ErrorBoundary";
import TaskInput from "./Components/Tasks/TaskInput";
import EditTasks from "./Components/Tasks/EditTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TaskHome></TaskHome>,
  },
  {
    path: "/create-task",
    element: <TaskInput></TaskInput>,
  },
  {
    path: "/edit-task/:id",
    element: <EditTasks></EditTasks>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
