import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import Profile from '../components/profile/Profile';
import UpdateProfile from '../components/profile/UpdateProfile';
import ProtectedRoute from '../components/ProtectedRoute';



const ProfileRoutes = [
    { path:"me", element: (
        <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "clerk", "peon", "office_boy", "receptionist", "trainee", "customer"]}>
            <Profile/>
        </ProtectedRoute>
        ) },

    {
        path:"profile",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "clerk", "peon", "office_boy", "receptionist", "trainee", "customer"]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <Profile/>},
            { path: "update", element: <UpdateProfile/>},
            { path: "delete", element:(
            <ProtectedRoute roles={["admin"]}>
                <ComingSoon/>,
            </ProtectedRoute>
                )},
        ]
    },
];

export default ProfileRoutes;