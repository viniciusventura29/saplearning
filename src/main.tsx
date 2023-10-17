import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Page404 from "./pages/Page404.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ArticlePage from "./pages/[id]/index.tsx";
import { EditPage } from "./pages/[id]/edit.tsx";
import { AdminPage } from "./pages/admin/index.tsx";
import { AllUsersPage } from "./pages/admin/AllUsers.tsx";
import { NewUserPage } from "./pages/admin/NewUser.tsx";
import { Alert } from "./components/Alert.tsx";
import { UserPage } from "./pages/UserPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:id",
    element: <ArticlePage />,
  },
  {
    path: "/:id/edit",
    element: <EditPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/newUsers",
    element: <NewUserPage />,
  },
  {
    path: "/admin/allUsers",
    element: <AllUsersPage />,
  },
  {path: "/me",
  element: <UserPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Alert />
    <RouterProvider router={router} fallbackElement={<Page404 />} />
  </QueryClientProvider>
);
