import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItemDetails = ({ formData, setFormData, handleChange }) => {
  const [queryItemCode, setQueryItemCode] = useState("");
    const [queryItemName, setQueryItemName] = useState("");

    const navigate = useNavigate();

  const allProducts = useSelector((store) => store.products.allProducts);

  const filteredByCode = queryItemCode
    ? allProducts.filter((i) =>
        i.itemCode.trim().includes(queryItemCode.trim())
      )
    : [];

  const filteredByName = queryItemName
    ? allProducts.filter((i) =>
        i.productName.toLowerCase().includes(queryItemName.toLowerCase().trim())
      )
    : [];

  const handleSelect = (item) => {
      setFormData({
        ...formData,
        item: item._id,
        productName: item.productName,
        itemCode: item.itemCode,
        unit: item.unit,
        salePrice: item.salePrice,
        mrp: item.mrp,
        quantity: 1,
      });
      setQueryItemCode(item.itemCode);
      setQueryItemName(item.productName);
    };
  
  const handleAddItem = (e) =>{
    e.preventDefault()
    navigate("/product/create")
  }

  return allProducts && (
    <div className="border border-base-300 relative rounded-md shadow-sm p-4 bg-base-100">
      <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
        Particulars
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

        {/* Item Code */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Item Code</span>
          </label>
          <Combobox value={formData.itemCode} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQueryItemCode(e.target.value)}
                displayValue={() => formData.itemCode || ""}
                placeholder="Type Item Code"
              />
              {filteredByCode.length > 0 && (
                <Combobox.Options 
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredByCode.map((item) => (
                  <Combobox.Option
                    key={item._id}
                    value={item}
                    className={({ active }) => `cursor-pointer px-4 py-2 ${ active ? "bg-blue-500 text-white" : "text-black" }`}
                  >
                    {item.itemCode}
                  </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        {/* Item Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Item Name</span>
            <button className=" bg-primary text-white font-bold px-2" onClick={handleAddItem}>+</button>
          </label>
          <Combobox value={formData.productName} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQueryItemName(e.target.value)}
                displayValue={() => formData.itemCode || ""}
                placeholder="Type Item Name"
              />
              {filteredByName.length > 0 && (
                <Combobox.Options 
                  className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredByName.map((item) => (
                  <Combobox.Option
                    key={item._id}
                    value={item}
                    className={({ active }) => `cursor-pointer px-4 py-2 ${ active ? "bg-blue-500 text-white" : "text-black" }`}
                  >
                    {item.productName}
                  </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        {/* Unit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Unit</span>
          </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
            />
        </div>

        {/* Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Quantity</span>
          </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity ?? ""}
              onChange={handleChange}
              // onChange={handleQuantityChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Quantity"
            />
        </div>

        {/* Sale Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Sale Price</span>
          </label>
            <input
              type="text"
              name="salePrice"
              value={formData.salePrice ?? ""}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Sale Price"
            />
        </div>
 
        {/* MRP */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">MRP</span>
          </label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp ?? ""}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="M.R.P."
            />
        </div>

        {/* Discount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Disc (%)</span>
          </label>
            <input
              type="number"
              name="discount"
              value={formData.discount ?? ""}
              onChange={handleChange}
              // onChange={handleDiscountChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Enter discount %"
            />
        </div>

        {/* Amount */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Amount</span>
          </label>
            <input
              type="number"
              name="discount"
              value={formData.discount ?? ""}
              onChange={handleChange}
              // value={calculateTotalAmount()}
              className="input input-bordered input-sm text-xs"
              placeholder=""
              readOnly
            />
        </div>

        {/* item description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Item Description</span>
          </label>
            <input
              type="text"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Item Description"
              />
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;