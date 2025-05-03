import React from "react";
import ManageRepairTable from "./repairComponents/ManageRepairTable";
import BookingRepair from "./BookingRepair";

const ManageRepair = () => {

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <BookingRepair/>
      </div>
      <div className="p-4">
        <ManageRepairTable />
      </div>
    </div>
  )
}

export default ManageRepair