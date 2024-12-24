import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Outlet, Navigate } from "react-router-dom";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import AdminDashboard from "../components/user/AdminDashboard";
import CreateCustomer from "../components/customer/CreateCustomer";
import UserDashboard from "../components/user/UserDashboard";
import useAuthWithRoles from "../hooks/useAuthWithRoles";
import useAuth from "../hooks/useAuth";

const AdminProtectedRoute = ({ children }) => {
  const { hasAccess } = useAuthWithRoles(["Admin"]);
  return hasAccess ? children : <Navigate to="/login" replace />;
};

const RedirectOnLogin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated) {
    if (user?.designation === "Admin") return <Navigate to="/admin/dashboard" replace />;

    const userDesignations = [
      "Relationship Manager",
      "Marketing Executive",
      "Manager",
      "Accountant",
      "Clerk",
      "Peon",
      "Office Boy",
      "Receptionist",
      "Trainee",
    ];

    if (userDesignations.includes(user?.designation)) {
      return <Navigate to="/user/dashboard" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const PrivateRoutes = [
  {
    path: "login",
    element: (
      <RedirectOnLogin>
        <Outlet />
      </RedirectOnLogin>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <CustomerDashboard />,
      },
    ],
  },
  {
    path: "user/dashboard",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <UserDashboard />,
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <Outlet />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/auth/customer",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "create",
        element: <CreateCustomer />,
      },
    ],
  },
];

export default PrivateRoutes;



// import React from "react";
// import ProtectedRoute from "./ProtectedRoute";
// import { Outlet, Navigate } from "react-router-dom";
// import CustomerDashboard from "../components/customer/CustomerDashboard";
// import AdminDashboard from "../components/user/AdminDashboard";
// import CreateCustomer from "../components/customer/CreateCustomer";
// import useAuthWithRoles from "../hooks/useAuthWithRoles";

// const AdminProtectedRoute = ({ children }) => {
//   const { hasAccess } = useAuthWithRoles(["Admin"]);
//   return hasAccess ? children : <Navigate to="/login" replace />;
// };

// const PrivateRoutes = [
//   {
//     path: "dashboard",
//     element: (
//       <ProtectedRoute>
//         <Outlet />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: "",
//         element: <CustomerDashboard />,
//       },
//     ],
//   },
//   {
//     path: "admin/dashboard",
//     element: (
//       <AdminProtectedRoute>
//         <Outlet />
//       </AdminProtectedRoute>
//     ),
//     children: [
//       {
//         path: "",
//         element: <AdminDashboard />,
//       },
//     ],
//   },
//   {
//     path: "/auth/customer",
//     element: (
//       <ProtectedRoute>
//         <Outlet />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: "create",
//         element: <CreateCustomer />,
//       },
//     ],
//   },
// ];

// export default PrivateRoutes;
