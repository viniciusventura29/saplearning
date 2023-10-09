import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Page404 from "./pages/Page404.tsx";
import { QueryClient, QueryClientProvider} from "react-query";
import ArticlePage from "./pages/[id]/index.tsx";
import EditArtcilePage, { EditPage } from "./pages/[id]/edit.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} fallbackElement={<Page404 />} />
  </QueryClientProvider>
);
