import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import InvoiceTable from "./InvoiceTable";

const ManageInvoice = () => {
    useFetchInvoices();

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <InvoiceTable />
            </div>
        </div>
    );
};

export default ManageInvoice;
