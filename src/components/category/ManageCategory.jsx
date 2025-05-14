import React from "react";
import CreateCategory from "./CreateCategory";
import ManageCategoryTable from "./ManageCategoryTable";

const ManageCategory = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateCategory/>
      </div>
      <div className="p-4">
        <ManageCategoryTable/>
      </div>
    </div>
  )
};

export default ManageCategory;