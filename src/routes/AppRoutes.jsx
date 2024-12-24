import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterForm from "../components/RegisterForm";
import Logout from "../components/Logout";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Layout Component to wrap all pages with Header and Footer
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Define routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Wrap all routes with AppLayout
    children: [
      { path: "/", element: <HomePage /> },
      { path: "register", element: <RegisterForm /> },
      { path: "logout", element: <Logout /> },
      { path: "login", element: <LoginForm /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={appRouter} />;
}

export default AppRoutes;
