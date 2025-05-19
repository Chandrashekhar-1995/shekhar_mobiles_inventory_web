import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateRepairItem } from "../../../../service/repairApi";
import { setAllRepairs } from "../../../store/repairSlice";
import useFetchRepairs from "../../../hooks/useFetchRepairs";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";
import { toast } from "react-toastify";

const ManageRepairTable = () => {
    const dispatch = useDispatch();
    const [editingStatus, setEditingStatus] = useState({ repairId: null, itemIndex: null });
    const [editingProcess, setEditingProcess] = useState({ repairId: null, itemIndex: null });
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedProcess, setSelectedProcess] = useState("");

    useFetchRepairs();
    useFetchRepairProcesses(); 
    const repairs = useSelector((store) => store.repairs.allRepairs);
    const repairProcesses = useSelector((store) => store.repairProcesses.allProcesses);
    
    const formatToIndianDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const handleStatusChange = (repairId, itemIndex, currentStatus) => {
        setEditingStatus({ repairId, itemIndex });
        setEditingProcess({ repairId: null, itemIndex: null }); // Close process editor if open
        setSelectedStatus(currentStatus);
    };

    const handleProcessChange = (repairId, itemIndex, currentProcess) => {
        setEditingProcess({ repairId, itemIndex });
        setEditingStatus({ repairId: null, itemIndex: null });
        setSelectedProcess(currentProcess?._id || "");
    };

    const handleStatusUpdate = async (repairId, itemIndex) => {
        const data = await updateRepairItem(repairId, {
            itemIndex,
            repairStatus: selectedStatus,
        });
        if (data.success) {
            toast.success(data.message)
            const updatedRepairs = repairs?.map(repair =>
                repair._id === repairId ? {
                        ...repair,
                        repairing: repair.repairing.map((item, i) =>
                            i === itemIndex
                                ? { ...item, repairStatus: selectedStatus }
                                : item
                        )
                    }
                    : repair
            );
            dispatch(setAllRepairs(updatedRepairs));
        } else {
            toast.error(data.message)
        }
        setEditingStatus({ repairId: null, itemIndex: null });
    };

    const handleProcessUpdate = async (repairId, itemIndex) => {
        const data = await updateRepairItem(repairId, {
            itemIndex,
            repairProcess: selectedProcess,
            repairStatus: "in_progress"
        });
        
        if (data.success) {
            toast.success("Repair process updated successfully");
            const updatedRepairs = repairs?.map(repair =>
                repair._id === repairId ? {
                        ...repair,
                        repairing: repair.repairing.map((item, i) =>
                            i === itemIndex
                                ? { 
                                    ...item, 
                                    repairProcess: selectedProcess,
                                    repairStatus: item.repairStatus === "booked" ? "in_progress" : item.repairStatus
                                }
                                : item
                        )
                    }
                    : repair
            );
            dispatch(setAllRepairs(updatedRepairs));
        } else {
            toast.error(data.message || "Failed to update repair process");
        }
        setEditingProcess({ repairId: null, itemIndex: null });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Repair No</th>
                        <th className="px-4 py-2">Booking Date</th>
                        <th className="px-4 py-2">Customer</th>
                        <th className="px-4 py-2">Items</th>
                        <th className="px-4 py-2">Fault</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Process</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {repairs && repairs.map((repair, index) => (
                        <React.Fragment key={repair._id}>
                            {repair.repairing.map((item, itemIndex) => (
                                <tr key={`${repair._id}-${itemIndex}`} className="odd:bg-white even:bg-gray-100">
                                    {itemIndex === 0 && (
                                        <>
                                            <td rowSpan={repair.repairing.length} className="border px-4 text-black py-2">
                                                {index + 1}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                <Link to={`/repair/update/${repair._id}`} className="text-blue-500 hover:underline">
                                                    {repair.repairNumber}
                                                </Link>
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 text-black py-2">
                                                {formatToIndianDate(repair.bookingDate)}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 text-black py-2">
                                                {repair.customer.name}
                                            </td>
                                        </>
                                    )}
                                    <td className="border px-4 py-2">
                                        {item.deviceType === "mobile"
                                            ? `${item.brandName} ${item.modelNo ?? ""}`
                                            : item.repairItem}
                                    </td>

                                    <td className="border px-4 py-2">
                                        <Link to={`/repair/update/repair-item/${repair._id}/${itemIndex}`} className="text-blue-500 hover:underline">
                                            {item.fault.fault}
                                        </Link>
                                    </td>

                                    <td className="border px-4 py-2">
                                        {editingStatus.repairId === repair._id && editingStatus.itemIndex === itemIndex ? (
                                            <select
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                                className="border p-1 rounded"
                                            >
                                                <option value="booked">Booked</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="repair_done">Repair Done</option>
                                                <option value="reject">Reject</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="return">Return</option>
                                            </select>
                                        ) : (
                                            <span
                                                onClick={() => handleStatusChange(repair._id, itemIndex, item.repairStatus || "")}
                                                className="cursor-pointer hover:underline"
                                            >
                                                {(item.repairStatus || "No Status").replace(/_/g, " ")}
                                            </span>
                                        )}
                                    </td>

                                    <td className="border px-4 py-2">
                                        {editingProcess.repairId === repair._id && editingProcess.itemIndex === itemIndex ? (
                                            <select
                                                value={selectedProcess}
                                                onChange={(e) => setSelectedProcess(e.target.value)}
                                                className="border p-1 rounded"
                                            >
                                                <option value="">Select Process</option>
                                                {repairProcesses?.map(process => (
                                                    <option key={process._id} value={process._id}>
                                                        {process.processName}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span
                                                onClick={() => handleProcessChange(repair._id, itemIndex, item.repairProcess)}
                                                className="cursor-pointer hover:underline"
                                            >
                                                {item.repairProcess?.processName || "No Process"}
                                            </span>
                                        )}
                                    </td>

                                    {itemIndex === 0 && (
                                        <>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2">
                                                {repair.totalPayableAmount}
                                            </td>
                                            <td rowSpan={repair.repairing.length} className="border px-4 py-2 flex gap-2">
                                                {editingStatus.repairId === repair._id ? (
                                                    <button
                                                        onClick={() => handleStatusUpdate(repair._id, editingStatus.itemIndex)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    >
                                                        Update Status
                                                    </button>
                                                ) : editingProcess.repairId === repair._id ? (
                                                    <button
                                                        onClick={() => handleProcessUpdate(repair._id, editingProcess.itemIndex)}
                                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                    >
                                                        Update Process
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(repair._id, 0, repair.repairing[0].repairStatus || "")}
                                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                        >
                                                            Status
                                                        </button>
                                                        <button
                                                            onClick={() => handleProcessChange(repair._id, 0, repair.repairing[0].repairProcess)}
                                                            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                                                        >
                                                            Process
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRepairTable;
