import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PrivateRoutes from "./PrivateRoutes";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateLayout from "../components/layouts/PrivateLayout";
import ProfileRoutes from "./ProfileRoutes";
import CustomerRoutes from "./CustomerRoutes";


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
      ...ProfileRoutes,
      ...CustomerRoutes,
      {
        element:<PrivateLayout/>,
        children:[...PrivateRoutes]
      },
      { path: "*", element: <HomePage /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={appRouter} />;

export default AppRoutes;