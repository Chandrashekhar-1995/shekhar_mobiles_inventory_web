import React from "react";
import CreateMobile from "./CreateMobile";
import ManageMobileTable from "./mobileComponents/ManageMobileTable";

const ManageMobile = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateMobile/>
      </div>
      <div className="p-4">
        <ManageMobileTable/>
      </div>
    </div>
  )
}

export default ManageMobile