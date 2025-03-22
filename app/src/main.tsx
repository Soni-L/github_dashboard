import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import GithubAuth from "./pages/GithubAuth.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "auth",
        element: (
          <>
            <GithubAuth /> <Outlet />
          </>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
