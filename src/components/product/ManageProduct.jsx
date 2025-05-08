import React from "react";
import CreateProduct from "./CreateProduct";
import ManageProductTable from "./productComponents/ManageProductTable";

const ManageProduct = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateProduct/>
      </div>
      <div className="p-4">
        <ManageProductTable/>
      </div>
    </div>
  )
}

export default ManageProduct;