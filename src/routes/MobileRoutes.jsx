import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateMobile from '../components/mobile/createMobile';


const MobileRoutes = [
    {
        path:"mobile",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ComingSoon/>}, // manage product all list
            { path: "create", element: <CreateMobile/>},
            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
];

export default MobileRoutes;