import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ComingSoon from "../components/ComingSoon";
import ManageRepairs from "../components/repairing/ManageRepairs";
import BookRepair from "../components/repairing/BookRepair";
 
const RepairingRoutes = [
  {
    path: "repair",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ManageRepairs/> }, 
      { path: "booking", element: <BookRepair/> },
      { path: "status/:id", element: <ComingSoon/> },
    ],
  },
];

export default RepairingRoutes;
0