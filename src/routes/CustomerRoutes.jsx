import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateCustomerPc from "../components/dextop/customer/CreateCustomer";
import CreateCustomer from "../components/customer/CreateCustomer";




const CustomerRoutes = [
    {
        path: "auth/user/customer",
        element: (
          <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { 
            path: "",
            element: <CreateCustomer/>,
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <CreateCustomerPc /> 
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <CreateCustomer/>
              </ProtectedRoute>
            ),
          },
        ],
    },
];

export default CustomerRoutes;