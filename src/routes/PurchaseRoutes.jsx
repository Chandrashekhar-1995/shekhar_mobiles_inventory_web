import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateInvoice from '../components/sales/CreateInvoice';
import ManageInvoice from '../components/sales/ManageInvoice';
import UpdateInvoice from '../components/sales/UpdateInvoice';
import CreatePurchaseInvoice from '../components/purchase/CreatePurchaseInvoice';
import UpdatePurchaseInvoice from '../components/purchase/UpdatePurchaseInvoice';
import ManagePurchaseInvoice from '../components/purchase/ManagePurchaseInvoice';



const PurchaseRoutes = [
    {
        path:"purchase",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "return", element: <ComingSoon/>},
            { path: "quotation", element: <ComingSoon/>},
            { path: "delivery_note", element: <ComingSoon/>},
            { path: "order", element: <ComingSoon/>},
            { path: "credit_note", element: <ComingSoon/>},
            { path: "debit_note", element: <ComingSoon/>},
        ]
    },

    {
        path:"purchase/invoice",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ManagePurchaseInvoice/>},
            { path: "create", element: <CreatePurchaseInvoice/>},
            { path: "update/:id", element: <UpdatePurchaseInvoice/>},
        ]
    },
];

export default PurchaseRoutes;