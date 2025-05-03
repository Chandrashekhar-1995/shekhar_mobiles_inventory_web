import React, { useState } from "react";
import { createFault } from "../../../../service/faultApi";
import { toast } from "react-toastify";

const CreateFault = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
          fault: "",
          subFaults: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.fault) {
        toast.error("Please fill Problem name");
        return;
      }
      const data = await createFault(formData);
      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        resetForm()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  };
  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Problem
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Create New Problem</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Problem Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Problem */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xs">Problem</span>
                            </label>
                            <input
                                type="text"
                                name="fault"
                                value={formData.fault}
                                onChange={handleChange}
                                className="input input-bordered input-sm text-xs"
                                placeholder="e.g., Charging"
                            />
                        </div>

                        {/* Sub Problem */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xs">Sub Problem</span>
                            </label>
                            <input
                                type="text"
                                name="subFaults"
                                value={formData.subFaults}
                                onChange={handleChange}
                                className="input input-bordered input-sm text-xs"
                                placeholder="e.g., Type-C"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                className="btn btn-sm btn-ghost"
                                onClick={() => {
                                setShowModal(false);
                                resetForm();
                                }}
                            >
                            Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-sm btn-primary"
                            >
                            Create Problem
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
      )}
        
    </div>
  )
}

export default CreateFault