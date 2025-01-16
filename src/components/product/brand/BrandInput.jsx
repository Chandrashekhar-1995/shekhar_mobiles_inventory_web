import React from "react";

const BrandInput = ({ brands, value, onChange }) => {
  return (
    <div className="col-span-2 grid grid-cols-3 m-2">
      <label className="text-xs font-medium p-2">Brand</label>
      <select
        name="brand"
        className="col-span-2 border border-gray-300 rounded p-2 text-xs"
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        required
      >
        <option value="" disabled>
          Select Brand
        </option>
        {brands.map((brand, index) => (
          <option key={index} value={brand.brandName}>
            {brand.brandName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandInput;
