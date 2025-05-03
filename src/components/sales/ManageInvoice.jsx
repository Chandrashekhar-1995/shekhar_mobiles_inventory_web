import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import CreateInvoice from "./CreateInvoice";
import ManageInvoiceTable from "./invoiceComponents/ManageInvoiceTable";

const ManageInvoice = () => {
    useFetchInvoices();

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <CreateInvoice/>
            </div>
            <div className="p-4">
                <ManageInvoiceTable />
            </div>
        </div>
    );
};

export default ManageInvoice;
