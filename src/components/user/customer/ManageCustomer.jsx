import React from 'react'
import useFetchCustomers from '../../../hooks/useFetchCustomers'
import CustomerTable from './CustomerTable';
import CreateCustomer from "./CreateCustomer";

const ManageCustomer = () => {
  // useFetchCustomers();
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateCustomer/>
      </div>
      <div className="p-4">
        {/* <CustomerTable/> */}
      </div>
    </div>
  )
}

export default ManageCustomer