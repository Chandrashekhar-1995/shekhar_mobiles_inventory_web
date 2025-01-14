import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Brand from "../components/product/Brand";
import CreateBrand from "../components/product/CreateBrand";
import CreateProduct from "../components/product/CreateProduct";
import Product from "../components/product/Product";
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
  {
    path: "product",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Product/> },
      { path: "create", element: <CreateProduct/> },
    ],
  },
];

export default ProductRoutes;
0