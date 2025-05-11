import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ManagePurchaseInvoiceTable = () => {
    const invoices = useSelector((store) => store.purchaseInvoices.allInvoices);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB");
    };

    return invoices && (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Invoice No.</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Supplier Name</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <tr 
                            key={invoice._id} 
                            className="odd:bg-white even:bg-gray-100"
                        >
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{invoice.status}</td>
                            <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                            <td className="border px-4 py-2">{formatDate(invoice.date)}</td>
                            <td className="border px-4 py-2">{invoice.supplier.name}</td>
                            <td className="border px-4 py-2">{invoice.totalAmount}</td>
                            <td className="border px-4 py-2">
                                <Link 
                                    to={`/purchase/invoice/update/${invoice._id}`} 
                                    className="text-blue-500 hover:underline"
                                >
                                    View/Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePurchaseInvoiceTable;