import React from "react";
import ManageRepairProcessTable from "../repairs/processComponent/ManageRepairProcessTable";
import CreateNewAccount from "./CreateNewAccount";

const ManageAccounts = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateNewAccount/>
      </div>
      <div className="p-4">
        <ManageRepairProcessTable/>
      </div>
    </div>
  )
}

export default ManageAccounts;