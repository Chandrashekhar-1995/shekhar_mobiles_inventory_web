import React from "react"
import { Outlet } from "react-router-dom";
import ComingSoon from "../pages/ComingSoon";
import HomePage from "../pages/HomePage";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";



const CustomerRoutes = [

    {
        path:"customer",
        element:(
            <ProtectedRoute roles={["admin", "customer"]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <HomePage/>},
            { path: "dashboard", element: <CustomerDashboard/>},
            { path: "cart", element: <ComingSoon/>},
            { path: "purchase", element: <ComingSoon/>},
            { path: "repair", element: <ComingSoon/>},
        ]
    },
];

export default CustomerRoutes;