import React from 'react'
import { Outlet } from 'react-router-dom';
import ComingSoon from '../pages/ComingSoon';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateProduct from '../components/product/CreateProduct';
import UpdateProduct from '../components/product/UpdateProduct';



const ProductRoutes = [
    {
        path:"product",
        element:(
            <ProtectedRoute roles={["relationship_manager","admin","marketing_executive", "manager", "accountant", "office_boy", "receptionist", "trainee",]}>
                <Outlet/>
            </ProtectedRoute>
        ),
        children:[
            { path: "", element: <ComingSoon/>}, // manage product all list
            { path: "create", element: <CreateProduct/>},
            { path: "update/:id", element: <UpdateProduct/>},
        ]
    },
];

export default ProductRoutes;