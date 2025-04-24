import React from "react";

const MobileFields = ({ formData, setFormData, handleChange }) => {
  return (
    <>
      {[
        { label: "Purchase Price", name: "purchasePrice" },
        { label: "Sale Price", name: "salePrice" },
        { label: "Min Sale Price", name: "minSalePrice" },
        { label: "MRP", name: "mrp" },
        { label: "Opening Stock", name: "openingStock" },
        { label: "UNIT", name: "unit" },
        { label: "Warranty", name: "warranty" },
      ].map(({ label, name }) => (
        <div className="form-control" key={name}>
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
    </>
  );
};

export default MobileFields;
