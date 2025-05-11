import React from "react"
import { Outlet } from "react-router-dom";
import ComingSoon from "../pages/ComingSoon";
import ProtectedRoute from "../components/ProtectedRoute";


const ExpenseRoutes = [
    {
        path:"expense",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ComingSoon/>}, // all expense
            { path: "direct", element: <ComingSoon/>},
            { path: "indirect", element: <ComingSoon/>},
        ]
    },


];

export default ExpenseRoutes;