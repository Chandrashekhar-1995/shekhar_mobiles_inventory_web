import React from "react";
import CreateNewAccount from "./CreateNewAccount";
import ManageAccountTable from "./ManageAccountTable";

const ManageAccounts = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateNewAccount/>
      </div>
      <div className="p-4">
        <ManageAccountTable/>
      </div>
    </div>
  )
}

export default ManageAccounts;