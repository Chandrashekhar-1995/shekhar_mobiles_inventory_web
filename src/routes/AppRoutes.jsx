import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoutes from "./PrivateRoutes";

const AppLayout = () => (
  <div className="app">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login/> },
      ...PrivateRoutes,
      { path: "*", element: <HomePage /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={appRouter} />;

export default AppRoutes;
