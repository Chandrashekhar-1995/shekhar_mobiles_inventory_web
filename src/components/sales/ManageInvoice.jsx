import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import ManageInvoiceTable from "./invoiceComponents/ManageInvoiceTable";
import InvoiceContainer from "./InvoiceContainer";

const ManageInvoice = () => {
    useFetchInvoices();

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <InvoiceContainer/>
            </div>
            <div className="p-4">
                <ManageInvoiceTable />
            </div>
        </div>
    );
};

export default ManageInvoice;
