import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import Sidebar from "../Dashboard/Sidebar";
import InvoiceTable from "./InvoiceTable";

const ManageInvoice = () => {
    useFetchInvoices();

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-2 ">
                <Sidebar />
            </div>
            <div className="col-span-9 p-4">
                <InvoiceTable />
            </div>
        </div>
    );
};

export default ManageInvoice;
