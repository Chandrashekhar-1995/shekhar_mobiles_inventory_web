import React from "react";
import useFetchRepairs from "../../hooks/useFetchRepairs";
import ManageRepairTable from "./repairComponents/ManageRepairTable";

const ManageRepair = () => {

  useFetchRepairs();
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <ManageRepairTable />
      </div>
    </div>
  )
}

export default ManageRepair