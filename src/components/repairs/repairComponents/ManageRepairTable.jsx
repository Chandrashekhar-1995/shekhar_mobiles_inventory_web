import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ManageRepairTable = () => {
    const repairs = useSelector((store) => store.repairs.allRepairs);
    
    const formatToIndianDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Repair No</th>
                        <th className="px-4 py-2">Booking Date</th>
                        <th className="px-4 py-2">Items</th>
                        <th className="px-4 py-2">Fault</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {repairs && repairs.map((repair, index) => (
                        <React.Fragment key={repair._id}>
                            {repair.repairing.map((item, itemIndex) => (
                                <tr 
                                    key={`${repair._id}-${itemIndex}`}
                                    className="odd:bg-white even:bg-gray-100"
                                >
                                    {itemIndex === 0 ? (
                                        <>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                {repair.repairNumber}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                {formatToIndianDate(repair.bookingDate)}
                                            </td>
                                        </>
                                    ) : null}
                                    
                                    <td className="border px-4 py-2">
                                        {item.type === "mobile" 
                                            ? `${item.brandName} ${item.modelNo?? ""}`
                                            : item.repairItem}
                                    </td>
                                    <td className="border px-4 py-2">{item.problem}</td>
                                    <td className="border px-4 py-2">{item.repairPrice}</td>
                                    
                                    {itemIndex === 0 ? (
                                        <>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                {repair.repairStatus}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                <Link 
                                                    to={`/repair/update/${repair._id}`} 
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    View/Edit
                                                </Link>
                                            </td>
                                        </>
                                    ) : null}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManageRepairTable;