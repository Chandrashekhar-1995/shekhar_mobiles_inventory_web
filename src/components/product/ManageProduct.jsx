import React from "react";
import CreateProduct from "./CreateProduct";
import ManageProductTable from "./productComponents/ManageProductTable";
import BulkUploadProduct from "./productComponents/BulkUploadProduct";

const ManageProduct = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateProduct/>
        <BulkUploadProduct/>
      </div>
      <div className="p-4">
        <ManageProductTable/>
      </div>
    </div>
  )
}

export default ManageProduct;