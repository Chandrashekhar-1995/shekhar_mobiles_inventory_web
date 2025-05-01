import React from "react"

const RepairingProcess = ({formData, setFormData, handleChange}) => {
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

        {/* Repair Status */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Repair Type</span>
            </label>
            <select
                name="repairStatus"
                value={formData.repairStatus}
                onChange={handleChange}
                className="select select-bordered select-sm text-xs"
            >
                <option value="booked">Booked</option>
                <option value="in_progress">In Progress</option>
                <option value="repair_done">Repair Done</option>
                <option value="reject">Reject</option>
            </select>
        </div>

        </div>
    </div>
  )
}

export default RepairingProcess;