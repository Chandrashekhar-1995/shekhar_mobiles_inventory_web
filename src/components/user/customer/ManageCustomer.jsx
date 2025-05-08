import React from "react"
import CustomerTable from "./CustomerTable";
import CreateCustomer from "./CreateCustomer";
import BulkUploadCustomer from "../../customer/BulkUploadCustomer";

const ManageCustomer = () => {
  
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateCustomer/>
        <BulkUploadCustomer/>
      </div>
      <div className="p-4">
        <CustomerTable/>
      </div>
    </div>
  )
}

export default ManageCustomer