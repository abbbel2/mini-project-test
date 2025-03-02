import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/not-found-page";
import { LoginPage } from "../pages/login-page";
import { TicketsPage } from "../pages/tickets-page";
import { DashboardPage } from "../pages/dashboard-page";
import { KanbanPage } from "../pages/kanban-page";
import { ProtectedRoute } from "./protected-route";
import { SignUpPage } from "../pages/sign-up.page";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "tickets",
    element: (
      <ProtectedRoute>
        <TicketsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "kanban",
    element: (
      <ProtectedRoute>
        <KanbanPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <NotFoundPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
