import React from "react";

const OptionalFields = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {[
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Pin Code", name: "pinCode" },
        { label: "Country", name: "country" },
        { label: "Email", name: "email" },
        { label: "Referred By", name: "refferedBy" },
        { label: "PAN No", name: "panNo" },
        { label: "GSTIN", name: "gstin" },
        { label: "GST Type", name: "gstType" },
        { label: "Trade Name", name: "tradeName" },
        { label: "Account Type", name: "accountType" },
        { label: "Opening Balance", name: "openingBalance" },
      ].map(({ label, name }) => (
        <div className="form-control  w-full" key={name}>
          <label className="label">
            <span className="label-text text-xs">{label} </span>
          </label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs w-full"
          />
        </div>
      ))}
      
      {/* Document Type */}
      <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Identity Document</span>
          </label>
          <select
            name="documentType"
            className="select select-bordered select-sm text-xs"
            value={formData.documentType}
            onChange={handleChange}
          >
            <option value="aadhar_card">Aadhar Card</option>
            <option value="pan_card">Pan Card</option>
            <option value="driving_license">Driving License</option>
            <option value="government_id">Government ID</option>
            <option value="voter_card">Driving License</option>
          </select>
      </div>

      {/* Document Number */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-xs">Document Number</span>
        </label>
        <input
          type="text"
          name="documentNo"
          className="input input-bordered input-sm text-xs"
          value={formData.documentNo}
          onChange={handleChange}
        />
      </div>

    </div>
  );
};

export default OptionalFields;
