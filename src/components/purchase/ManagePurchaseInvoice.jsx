import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";

import ManageInvoiceTable from "../sales/invoiceComponents/ManageInvoiceTable";
import CreatePurchaseInvoice from "./CreatePurchaseInvoice";


const ManagePurchaseInvoice = () => {
  useFetchInvoices();
  return (
    <div className="min-h-screen">
            <div className="p-4">
                <CreatePurchaseInvoice/>
            </div>
            <div className="p-4">
                <ManageInvoiceTable />
            </div>
        </div>
  )
}

export default ManagePurchaseInvoice