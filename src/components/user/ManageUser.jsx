import React from 'react'
import useFetchCustomers from '../../../hooks/useFetchCustomers'
import UserTable from './UserTable';

const ManageUser = () => {
  useFetchCustomers();
  return (
    <div className="min-h-screen">
      <div>
        <UserTable/>
      </div>
    </div>
  )
}

export default ManageUser