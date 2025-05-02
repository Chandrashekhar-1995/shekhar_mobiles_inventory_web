import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchAccounts from "../../hooks/useFetchAccounts";

const ManageAccountTable = () => {

    useFetchAccounts();
    const accounts = useSelector((store) => store.accounts.allAccounts);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Account Name</th>
                        <th className="px-4 py-2">Account Type</th>
                        <th className="px-4 py-2">Balance</th>
                        <th className="px-4 py-2">Status isActive</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.map((a, index) => (
                        <tr key={a._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={a.length} className="border px-4 py-2">{index + 1}</td>
                            <td rowSpan={a.length} className="border px-4 py-2">
                                <Link to={`/account/update/${a._id}`} className="text-blue-500 hover:underline">
                                    {a.accountName}
                                </Link>
                            </td>
                            <td rowSpan={a.length} className="border px-4 py-2">
                                <Link to={`/account/update/${a._id}`} className="text-blue-500 hover:underline">
                                    {a.accountType}
                                </Link>
                            </td>
                            <td rowSpan={a.length} className="border px-4 py-2">
                                {a.balance}
                            </td>
                                <td rowSpan={a.length} className="border px-4 py-2">{a.isActive ? "Active" : "Deactive"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageAccountTable;
