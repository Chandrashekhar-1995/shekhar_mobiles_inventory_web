import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerTable = () => {
    const customers = useSelector((state) => state.customer.allCustomers);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };
  return (
    <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2">S.No.</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Mobile No.</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Balance</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers && customers.map((customer, index) => (
                            <tr 
                                key={customer._id} 
                                className="odd:bg-white even:bg-gray-100"
                            >
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{customer.name}</td>
                                <td className="border px-4 py-2">{customer.mobileNumber}</td>
                                <td className="border px-4 py-2">{customer.address}</td>
                                {/* <td className="border px-4 py-2">{formatDate(customer.address)}</td> */}
                                <td className="border px-4 py-2">{customer.balance}</td>
                                <td className="border px-4 py-2">
                                    <Link 
                                        to={`/user/customer/profile/${customer._id}`} 
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
  )
}

export default CustomerTable;