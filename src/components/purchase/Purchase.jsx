import React from "react";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoices";
import Sidebar from "../Dashboard/Sidebar";
import InvoiceTable from "./InvoiceTable";

const Purchase = () => {
    useFetchPurchaseInvoices();

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

export default Purchase;
