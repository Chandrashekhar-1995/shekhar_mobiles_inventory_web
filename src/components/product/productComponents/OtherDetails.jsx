import React from "react";

const OtherDetails = ({ formData, handleChange }) => {

  const toggleSwitches = [
    { label: "Print Description", name: "printDescription" },
    { label: "Enable Tracking", name: "enableTracking" },
    { label: "One Click Sale", name: "oneClickSale" },
    { label: "Print Serial No", name: "printSerialNo" },
    { label: "Not For Sale", name: "notForSale" },
  ];

  return (
    <div className="card bg-base-200 p-4 relative">
      <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold">Other Details</div>

      {/* Toggle Switches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {toggleSwitches.map(({ label, name }) => (
          <div className="form-control" key={name}>
            <label className="label cursor-pointer">
              <span className="label-text">{label}</span>
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={(e) => handleChange({ target: { name, value: e.target.checked } })}
                className="toggle toggle-primary"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherDetails;
