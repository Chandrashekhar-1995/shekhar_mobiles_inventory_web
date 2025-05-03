import React from "react";

const RequiredFields = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {[
        { label: "Full Name", name: "name" },
        { label: "Address", name: "address" },
        { label: "Mobile Number", name: "mobileNumber" },
      ].map(({ label, name }) => (
        <div className="form-control  w-full" key={name}>
          <label className="label">
            <span className="label-text text-xs">{label} {["name", "address", "mobileNumber"].includes(name) && "*"}</span>
          </label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs w-full"
            required={["name", "address", "mobileNumber"].includes(name)}
          />
        </div>
      ))}
    </div>
  );
};

export default RequiredFields;
