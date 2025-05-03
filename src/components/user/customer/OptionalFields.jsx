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
        { label: "Gender", name: "gender" },
        { label: "PAN No", name: "panNo" },
        { label: "GSTIN", name: "gstin" },
        { label: "GST Type", name: "gstType" },
        { label: "Trade Name", name: "tradeName" },
        { label: "Account Type", name: "accountType" },
        { label: "Opening Balance", name: "openingBalance" },
        { label: "Document Type", name: "documentType" },
        { label: "Document Number", name: "documentNo" }
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
    </div>
  );
};

export default OptionalFields;
