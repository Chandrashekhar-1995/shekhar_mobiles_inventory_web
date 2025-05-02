import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import ManageRepair from '../components/repairs/ManageRepair';
import BookingRepair from '../components/repairs/BookingRepair';
import EditRepairItem from '../components/repairs/processComponent/EditRepairItem';
import CreateRepairProcess from '../components/repairs/processComponent/CreateRepairProcess';

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
            { path: "update/repair-item/:repairId/:itemIndex", element: <EditRepairItem/>},
            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
    {
        path:"repair-process",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "create", element: <CreateRepairProcess/>},
        ]
    },
];

export default RepairRoutes;