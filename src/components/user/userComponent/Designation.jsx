import React from "react";

const Designation = ({formData, handleChange}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Designation */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Designation</span>
          </label>
          <select
            name="designation"
            className="select select-bordered select-sm text-xs"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="trainee">Trainee</option>
            <option value="clerk">Clerk</option>
            <option value="office_boy">Office Boy</option>
            <option value="peon">Peon</option>
            <option value="receptionist">Receptionist</option>
            <option value="accountant">Accountant</option>
            <option value="manager">Manager</option>
            <option value="marketing_executive">Marketing Executive</option>
            <option value="relationship_manager">Relationship Manager</option>
          </select>
        </div>

        {/* Department */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Department</span>
          </label>
          <select
            name="department"
            className="select select-bordered select-sm text-xs"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
            <option value="human_resource">Human Resource</option>
            <option value="accounts">Accounts</option>
            <option value="management">Management</option>
          </select>
        </div>
    </div>
  )
}

export default Designation;