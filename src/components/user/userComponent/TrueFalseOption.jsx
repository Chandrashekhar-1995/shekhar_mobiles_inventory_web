import React from "react";

const TrueFalseOption = ({formData, handleChange}) => {
    const toggleSwitches = [
        { label: "Sales Commission", name: "salesCommission" },
        { label: "Credit Allowed", name: "creditAllowed" },
    ];
    return (
        <div className="">
          <div className="outline text-center text-2xl font-bold bg-white my-6">MORE OPTIONS</div>
    
          {/* Toggle Switches */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default TrueFalseOption;