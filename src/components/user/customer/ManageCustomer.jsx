import React from "react"
import CustomerTable from "./CustomerTable";
import CreateCustomer from "./CreateCustomer";

const ManageCustomer = () => {
  
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateCustomer/>
      </div>
      <div className="p-4">
        <CustomerTable/>
      </div>
    </div>
  )
}

export default ManageCustomer