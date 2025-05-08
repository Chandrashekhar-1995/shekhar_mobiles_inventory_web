import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import UserDashboard from '../components/user/UserDashboard';
import CustomerDashboard from '../components/user/customer/CustomerDashboard';
import CreateCustomer from '../components/user/customer/CreateCustomer';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateUser from '../components/user/CreateUser';
import AdminDashboard from '../components/admin/AdminDashboard';
import ManageCustomer from '../components/user/customer/ManageCustomer';
import CustomerProfile from '../components/user/customer/CustomerProfile';
import UserProfile from '../components/user/UserProfile';
import ManageSupplier from '../components/user/supplier/ManageSupplier';
import SupplierDashboard from '../components/user/supplier/SupplierDashboard';
import CreateSupplier from '../components/user/supplier/CreateSupplier';
import SupplierProfile from '../components/user/supplier/SupplierProfile';
import ManageUser from '../components/user/ManageUser';





const UserRoutes = [
    {
        path:"user",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "clerk", "peon", "office_boy", "receptionist", "trainee"]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManageUser/>},
            { path: "admin", element: <AdminDashboard/>}, 
            { path: "profile/:id", element: <UserProfile/>},
            { path: "manage", element: <ComingSoon/>},
            { path: "create", element: (
                <ProtectedRoute roles={["admin"]}>
                    <CreateUser/>
                </ProtectedRoute>
            )},
            
        ]
    },

    {
        path:"user/customer",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "clerk", "peon", "office_boy", "receptionist", "trainee"]}>  
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <CustomerDashboard/>},
            { path: "profile/:id", element: <CustomerProfile/>},
            { path: "create", element: <CreateCustomer/>},
            { path: "manage", element: <ManageCustomer/>},
            { path: "bulk-upload", element: <ManageCustomer/>},
        ]
    },

    {
        path:"user/supplier",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "clerk", "peon", "office_boy", "receptionist", "trainee"]}>  
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <SupplierDashboard/>},
            { path: "profile/:id", element: <SupplierProfile/>},
            { path: "create", element: <CreateSupplier/>},
            { path: "manage", element: <ManageSupplier/>},
        ]
    },
];

export default UserRoutes