import React from "react";
import CreatePurchaseInvoice from "./CreatePurchaseInvoice";
import ManagePurchaseInvoiceTable from "./invoiceComponents/ManagePurchaseInvoiceTable";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoice";


const ManagePurchaseInvoice = () => {
  useFetchPurchaseInvoices();
  return (
    <div className="min-h-screen">
            <div className="p-4">
                <CreatePurchaseInvoice/>
            </div>
            <div className="p-4">
                <ManagePurchaseInvoiceTable />
            </div>
        </div>
  )
}

export default ManagePurchaseInvoice