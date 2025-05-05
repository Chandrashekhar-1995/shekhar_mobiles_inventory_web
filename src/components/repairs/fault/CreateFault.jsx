import React, { useState } from "react";
import { createFault } from "../../../../service/faultApi";
import { toast } from "react-toastify";

const CreateFault = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fault: "",
    subFault: "",       // for input field
    subFaults: [],      // for array of added sub faults
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSubFault = () => {
    if (formData.subFault.trim() === "") return;
    if (formData.subFaults.includes(formData.subFault.trim())) {
      toast.warning("Sub Fault already added");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subFaults: [...prev.subFaults, prev.subFault.trim()],
      subFault: "",
    }));
  };

  const removeSubFault = (index) => {
    const updated = [...formData.subFaults];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, subFaults: updated }));
  };

  const resetForm = () => {
    setFormData({
      fault: "",
      subFault: "",
      subFaults: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fault) {
      toast.error("Please fill Problem name");
      return;
    }

    try {
      const data = await createFault({
        fault: formData.fault,
        subFaults: formData.subFaults,
      });

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create New Problem</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Problem Input */}
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

                {/* Sub Fault Input with Add Button */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">Sub Problem</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="subFault"
                      value={formData.subFault}
                      onChange={handleChange}
                      className="input input-bordered input-sm text-xs flex-1"
                      placeholder="e.g., Type-C Port"
                    />
                    <button
                      type="button"
                      onClick={addSubFault}
                      className="btn btn-sm btn-success"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Show Sub Faults */}
              {formData.subFaults.length > 0 && (
                <div>
                  <label className="label">
                    <span className="label-text text-xs">Added Sub Problems</span>
                  </label>
                  <ul className="flex flex-wrap gap-2">
                    {formData.subFaults.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gray-200 text-xs px-2 py-1 rounded flex items-center gap-1"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeSubFault(index)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFault;
