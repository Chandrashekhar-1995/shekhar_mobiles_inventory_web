import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivateRoutes from "./PrivateRoutes";

// Layout Component
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

// Define routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
      ...PrivateRoutes, // Include private routes
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={appRouter} />;

export default AppRoutes;
