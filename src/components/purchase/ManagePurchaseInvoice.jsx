import React from "react";
import ManagePurchaseInvoiceTable from "./invoiceComponents/ManagePurchaseInvoiceTable";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoice";
import MobileActionButtons from "../dashboard/components/MobileActionButtons";


const ManagePurchaseInvoice = () => {
  useFetchPurchaseInvoices();
  return (
    <div className="min-h-screen">
            <div className="p-4">
                <MobileActionButtons/>
            </div>
            <div className="p-4">
                <ManagePurchaseInvoiceTable />
            </div>
        </div>
  )
}

export default ManagePurchaseInvoice