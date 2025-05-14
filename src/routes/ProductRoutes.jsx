import React from "react"
import { Outlet } from "react-router-dom";
import ComingSoon from "../pages/ComingSoon";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateProduct from "../components/product/CreateProduct";
import UpdateProduct from "../components/product/UpdateProduct";
import ManageProduct from "../components/product/ManageProduct";
import ManageBrand from "../components/brand/ManageBrand";
import ManageCategory from "../components/category/ManageCategory";



const ProductRoutes = [
    {
        path:"product",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageProduct/>},
            { path: "create", element: <CreateProduct/>},
            { path: "update/:id", element: <UpdateProduct/>},
        ]
    },
    {
        path:"brand",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageBrand/>},

            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
    {
        path:"category",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageCategory/>},

            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
];

export default ProductRoutes;