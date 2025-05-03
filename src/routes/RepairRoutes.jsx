import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import ManageRepair from '../components/repairs/ManageRepair';
import BookingRepair from '../components/repairs/BookingRepair';
import EditRepairItem from '../components/repairs/processComponent/EditRepairItem';
import CreateRepairProcess from '../components/repairs/processComponent/CreateRepairProcess';
import ManageRepairProcess from '../components/repairs/ManageRepairProcess';
import ManageFault from '../components/repairs/fault/ManageFault';

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
            { path: "", element: <ManageRepairProcess/>},
            { path: "create", element: <CreateRepairProcess/>},
            { path: "update/:id", element: <ComingSoon/>},
        ]
    },
    {
        path:"fault",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageFault/>},
        ]
    },
];

export default RepairRoutes;