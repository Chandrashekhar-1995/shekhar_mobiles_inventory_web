import React from "react";
import { useSelector } from "react-redux";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import { Link } from "react-router-dom";

const ManageInvoice = () => {
    useFetchInvoices();
    const invoices = useSelector((state) => state.invoices);

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');  // Outputs as DD/MM/YYYY
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">S.No.</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Invoice No.</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Customer Name</th>
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
                                <td className="border px-4 py-2">{invoice.customerName}</td>
                                <td className="border px-4 py-2">{invoice.totalAmount}</td>
                                <td className="border px-4 py-2">
                                    <Link 
                                        to={`/invoice/${invoice._id}`} 
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
        </>
    );
};

export default ManageInvoice;
