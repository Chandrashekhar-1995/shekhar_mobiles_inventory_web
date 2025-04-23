import React from "react";

const MobileFields = ({ formData, setFormData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {[
        { label: "Model No", name: "modelNo" },
        { label: "EMEI Number", name: "emeiNumber" },
        { label: "EMEI Number 2", name: "emeiNumberSecond" },
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
            <span className="label-text">{label} </span>
          </label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default MobileFields;
