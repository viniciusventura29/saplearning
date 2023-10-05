import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Page404 from "./pages/Page404.tsx";
import { QueryClient, QueryClientProvider} from "react-query";
import TopicPage from "./pages/[id].tsx";

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
    element: <TopicPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} fallbackElement={<Page404 />} />
  </QueryClientProvider>
);
