import React from "react";
import MobileDetails from "./MobileDetails";
import FaultDetails from "./FaultDetails";

const RepairType = ({ formData, setFormData, handleChange }) => {
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* Invoice Type */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-xs">Repair Type</span>
                </label>
                <select
                    id="type"
                    name="type"
                    className="select select-bordered select-sm text-xs"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="mobile">Mobile</option>
                    <option value="lcd">LCD</option>
                    <option value="pc_laptop">PC/Laptop</option>
                    <option value="others">Others</option>
                </select>
            </div>

            {formData.type==="mobile" ?
            <MobileDetails formData={formData} setFormData={setFormData} handleChange={handleChange} /> : (<div className="form-control w-full">
                <label className="label">
                <span className="label-text text-xs">Repair Item</span>
                </label>
                <input
                    type="text"
                    name="repairItem"
                    className="input input-bordered input-sm text-xs"
                    value={formData.repairItem}
                    onChange={handleChange}
                />
            </div>)
            }

            {/* Fault Details */}
            <FaultDetails formData={formData} setFormData={setFormData} handleChange={handleChange} />
        </div>
    </div>
  )
}

export default RepairType