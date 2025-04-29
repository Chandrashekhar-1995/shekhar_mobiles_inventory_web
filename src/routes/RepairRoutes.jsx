import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import ManageRepair from '../components/repairs/ManageRepair';
import BookingRepair from '../components/repairs/BookingRepair';



const RepairRoutes = [
    {
        path:"repair",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageRepair/>},
            { path: "booking", element: <BookingRepair/>},
            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
];

export default RepairRoutes;