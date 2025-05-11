import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetchFaults from "../../../hooks/useFetchFaults";
import { deleteFault, deleteSubFault, updateFault } from "../../../../service/faultApi";
import { toast } from "react-toastify";

const ManageFaultTable = () => {
    const [showDropdown, setShowDropdown] = useState(null);
    const [formData, setFormData] = useState({
        fault:"",
        subFault:"",
        subFaults:[]
    });

    useFetchFaults();
    const faults = useSelector((store) => store.faults.allFaults);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prev) => ({ ...prev, name: value,
        }));
      };

    const resetForm = () =>{
        setFormData({
            fault:"",
            subFault:"",
            subFaults:[]
        });
    }
    
    const handleClickEdit = (e) =>{
        console.log(showDropdown);
        setFormData((prev) => ({ ...prev, fault: showDropdown,
        }));
    };

    const handleDelete = async (id) => {
        try {
            const data = await deleteFault(id);
            if(data.success){
                toast.success(data.message);
            } else {
                toast.error(data.message);

            }
        } catch (err) {

        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = await updateFault(FormData)
        if(data.success){
            toast.success(data.message);
            setFormData({
                fault:"",
                subFaults:[]
            });
        } else{
            toast.error(data.message);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="px-4 py-2">S.No.</th>
                        <th className="px-4 py-2">Fault</th>
                        <th className="px-4 py-2">Sub Fault</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faults && faults.map((f, index) => (
                        f.subFaults.map((sub, i) => (
                            <tr key={`${f._id}-${i}`} className="odd:bg-white even:bg-gray-100">
                                {i === 0 && (
                                    <>
                                        <td rowSpan={f.subFaults.length} className="border px-4 py-2">{index + 1}</td>
                                        <td rowSpan={f.subFaults.length} 
                                        className="border px-4 py-2 cursor-pointer" 
                                        onClick={() => setShowDropdown(f.fault === showDropdown ? null : f.fault)}
                                        >
                                            {f.fault}
                                            {showDropdown === f.fault && (
                                                <div className="relative">
                                                    <div className="absolute bg-white border rounded shadow-md p-2">
                                                        <button 
                                                        className="text-blue-500 block" 
                                                        onClick={handleClickEdit}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                        className="text-red-500 block mt-1" 
                                                        onClick={() => handleDelete(f._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </>
                                )}
                                <td className="border px-4 py-2">{sub}</td>
                                <td className="border px-4 py-2"></td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

            {/* Edit Form */}
            {formData.fault && (
                <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black  bg-op z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Edit Fault</h2>
                    <form onSubmit={handleEditSubmit}>
                        <label className="block mb-2">
                            Fault:
                            <input
                                type="text"
                                name="fault"
                                value={formData.fault}
                                onChange={handleChange}
                                className="border ml-2 p-1"
                            />
                        </label>
                        <label className="block mb-2">
                            SubFaults (comma-separated):
                            <input
                                type="text"
                                value={formData.subFaults.join(", ")}
                                onChange={handleChange}
                                className="border ml-2 p-1 w-full"
                            />
                        </label>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Update</button>
                        <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
};

export default ManageFaultTable;
