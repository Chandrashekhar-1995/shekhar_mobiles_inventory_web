import React from "react";
import UserTable from "./userComponent/UserTable";
import CreateUser from "./CreateUser";


const ManageUser = () => {

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateUser/>
      </div>
      <div className="p-4">
        <UserTable/>
      </div>
    </div>
  )
}

export default ManageUser;