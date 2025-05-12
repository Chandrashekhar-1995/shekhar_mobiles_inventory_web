import React from "react"
import CreateSupplier from "./CreateSupplier";
import SupplierTable from "./SupplierTable";

const ManageSupplier = () => {
  
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateSupplier/>
      </div>
      <div className="p-4">
        <SupplierTable/>
      </div>
    </div>
  )
}

export default ManageSupplier;