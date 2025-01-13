import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Brand from "../components/product/Brand";
import CreateBrand from "../components/product/CreateBrand";
;

const ProductRoutes = [
  {
    path: "brand",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Brand /> },
      { path: "create", element: <CreateBrand/> },
    ],
  },
];

export default ProductRoutes;
0