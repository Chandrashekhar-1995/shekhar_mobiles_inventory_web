import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";


const PrivateLayout = () => (
  <SidebarLayout>
    <Outlet/>
  </SidebarLayout>
);

export default PrivateLayout;