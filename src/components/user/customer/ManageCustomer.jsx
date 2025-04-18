import React from 'react'
import useFetchCustomers from '../../../hooks/useFetchCustomers'
import CustomerTable from './CustomerTable';

const ManageCustomer = () => {
  useFetchCustomers();
  return (
    <div className="min-h-screen">
      <div>
        <CustomerTable/>
      </div>
    </div>
  )
}

export default ManageCustomer