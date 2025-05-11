import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import BrandDropdown from "./BrandDropdown";

const RequiredFields = ({ formData, setFormData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CategoryDropdown formData={formData} setFormData={setFormData} />
      <BrandDropdown formData={formData} setFormData={setFormData} />

      {[
        { label: "Item Code", name: "itemCode" },
        { label: "Product Name", name: "productName" },
        { label: "Purchase Price", name: "purchasePrice" },
        { label: "Sale Price", name: "salePrice" },
        { label: "Min Sale Price", name: "minSalePrice" },
        { label: "MRP", name: "mrp" },
        { label: "Opening Stock", name: "openingStock" },
        { label: "UNIT", name: "unit" },
      ].map(({ label, name }) => (
        <div className="form-control  w-full" key={name}>
          <label className="label">
            <span className="label-text text-xs">{label} {["itemCode", "productName", "purchasePrice", "salePrice", "unit"].includes(name) && "*"}</span>
          </label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs w-full"
            required={["itemCode", "productName", "purchasePrice", "salePrice", "unit"].includes(name)}
          />
        </div>
      ))}
    </div>
  );
};

export default RequiredFields;
