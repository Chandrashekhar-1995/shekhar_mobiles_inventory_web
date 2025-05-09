import React from "react";

const ContactAndOthers = ({formData, handleChange}) => {
  return (
    <>
    <div className="outline text-center text-2xl font-bold bg-white mt-6">OTHER DETAILS</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {/* joiningDate */}
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Joining Date</span>
          </label>
          <input
            type="date"
            name="joiningDate"
            className="input input-bordered input-sm text-xs"
            value={formData.joiningDate || ""}
            onChange={handleChange}
          />
      </div>

        {/* communication */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Communication</span>
          </label>
          <select
            name="communication"
            className="select select-bordered select-sm text-xs"
            value={formData.communication}
            onChange={handleChange}
          >
            <option value="email">Sales</option>
            <option value="sms">Marketing</option>
          </select>
        </div>

        {/* bloodGroup */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Blood Group</span>
          </label>
          <input
            type="text"
            name="bloodGroup"
            className="input input-bordered input-sm text-xs"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
        </div>


        {/* emergencyContactPerson */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Emergency Contact Person</span>
          </label>
          <input
            type="text"
            name="emergencyContactPerson"
            className="input input-bordered input-sm text-xs"
            value={formData.emergencyContactPerson}
            onChange={handleChange}
          />
        </div>

        {/* emergencyContactNumber */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Emergency Contact Number</span>
          </label>
          <input
            type="text"
            name="emergencyContactNumber"
            className="input input-bordered input-sm text-xs"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
          />
        </div>

        
    </div>
    </>
  )
}

export default ContactAndOthers;