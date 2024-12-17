import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/Home"));
const Details = lazy(() => import("../pages/Details"));

const AppRouter = () => {
  return <RouterProvider router={publicRoutes} />;
};

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
];

const publicRoutes = createBrowserRouter([
  ...routes.map(({ path, element }) => ({
    path,
    element: <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>,
  })),
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
