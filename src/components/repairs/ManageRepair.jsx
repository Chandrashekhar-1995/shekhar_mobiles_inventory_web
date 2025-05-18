import React from "react";
import ManageRepairTable from "./repairComponents/ManageRepairTable";
import MobileActionButtons from "../dashboard/components/MobileActionButtons";

const ManageRepair = () => {

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <MobileActionButtons/>
      </div>
      <div className="p-4">
        <ManageRepairTable />
      </div>
    </div>
  )
}

export default ManageRepair