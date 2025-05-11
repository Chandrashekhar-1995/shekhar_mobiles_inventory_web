import React from "react"
import { Outlet } from "react-router-dom";
import ComingSoon from "../pages/ComingSoon";
import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../components/settings/Settings";


const SettingRoutes = [
    {
        path:"settings",
        element:(
            <ProtectedRoute roles={["admin"]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <Settings/>},
            { path: "direct", element: <ComingSoon/>},
        ]
    },
];

export default SettingRoutes;