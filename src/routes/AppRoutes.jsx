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
import ResetPassword from "../components/profile/ResetPassword";

const AppLayout = () => (
  <div className="app flex flex-col h-screen">
    <Header />
    <main className="flex-grow overflow-y-auto">
      <Outlet />
    </main>
    <Footer className="fixed bottom-0 left-0 w-full z-10" />
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
      { path: "reset-password", element: <ResetPassword/> },
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