import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetchRepairProcesses from "../../../hooks/useFetchRepairProcesses";

const ManageRepairProcessTable = () => {

    useFetchRepairProcesses();
    const processes = useSelector((store) => store.repairProcesses.allProcesses);
    console.log("hi", processes)
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Device </th>
                        <th className="px-4 py-2">Problem</th>
                        <th className="px-4 py-2">Process Name</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {processes && processes.map((p, index) => (
                        <tr key={p._id}className="odd:bg-white even:bg-gray-100">
                            <td rowSpan={p.length} className="border px-4 py-2">{index + 1}</td>
                            <td rowSpan={p.length} className="border px-4 py-2">{p.deviceType}</td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                {/* update this link to if clik than show connected all repair */}
                                <Link to={`/repair-process/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.fault}
                                </Link>
                            </td>
                            <td rowSpan={p.length} className="border px-4 py-2">
                                <Link to={`/repair-process/update/${p._id}`} className="text-blue-500 hover:underline">
                                    {p.processName}
                                </Link>
                            </td>
                                <td rowSpan={p.length} className="border px-4 py-2">{p.isActive ? "Active" : "Deactive"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageRepairProcessTable
