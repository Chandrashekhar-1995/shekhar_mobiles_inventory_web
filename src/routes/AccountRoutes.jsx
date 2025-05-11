import React from "react"
import { Outlet } from "react-router-dom";
import ComingSoon from "../pages/ComingSoon";
import ProtectedRoute from "../components/ProtectedRoute";
import ManageAccounts from "../components/account/ManageAccouts";



const AccountRoutes = [
    {
        path:"account",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageAccounts/>},
            { path: "create", element: <ComingSoon/>},
            { path: "update/:id", element: <ComingSoon/>},

        ]
    },
];

export default AccountRoutes;