import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../../../hooks/useFetchProducts";

const ItemDetails = ({ formData, setFormData, handleChange,}) => {
  const [queryItemCode, setQueryItemCode] = useState("");
  const [queryItemName, setQueryItemName] = useState("");
  const navigate = useNavigate();

  useFetchProducts();

  const allProducts = useSelector((store) => store.products.allProducts);
 
  const filteredByCode = queryItemCode ===""
    ?  allProducts : allProducts?.filter((i) =>
        i.itemCode?.trim().includes(queryItemCode.trim())
      );

  const filteredByName = queryItemName ===""
    ? allProducts : allProducts?.filter((i) =>
        i.productName?.toLowerCase().includes(queryItemName.toLowerCase().trim())
      );

  const handleSelect = (item) => {
      setFormData({
        ...formData,
        item: item._id,
        productName: item.productName,
        itemCode: item.itemCode,
        unit: item.unit,
        salePrice: item.salePrice,
        purchasePrice: item.purchasePrice,
        mrp: item.mrp,
        quantity: 1,
      });
      setQueryItemCode(item.itemCode);
      setQueryItemName(item.productName);
    };
  
  const calculateTotalAmount = () => {
      const { quantity, salePrice, discount } = formData;
      if (!quantity || !salePrice) return "";
  
      const total = quantity * salePrice;
      return discount > 0 ? total - (total * discount) / 100 : total;
    };

  const handleAddItem = (event) => {
      event.preventDefault();
  
      const { item, itemCode, productName, quantity, unit, salePrice, purchasePrice, mrp, discount, itemDescription } = formData;
  
      if (!productName || !quantity || !salePrice) {
        alert("Please fill in all required fields before adding an item.");
        return;
      }
  
      const newItem = {
        item,
        itemCode,
        productName,
        quantity: quantity || 1,
        unit,
        salePrice,
        purchasePrice,
        mrp,
        discount: discount || 0,
        total: calculateTotalAmount(),
        itemDescription,
      };
  
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
        itemCode: "",
        productName: "",
        quantity: "",
        unit: "",
        salePrice: "",
        purchasePrice: "",
        mrp: "",
        discount: "",
        itemDescription: "",
      }));
    };
  
  const handleCreateItem = (e) =>{
    e.preventDefault()
    navigate("/product/create")
  }

  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
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
              {filteredByCode && (
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
            <button className=" bg-primary text-white font-bold px-2" onClick={handleCreateItem}>+</button>
          </label>
          <Combobox value={formData.productName} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs"
                onChange={(e) => setQueryItemName(e.target.value)}
                displayValue={() => formData.productName || ""}
                placeholder="Type Item Name"
              />
              {filteredByName && (
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
              value={formData.quantity ?? 0}
              onChange={handleChange}
              // onChange={handleQuantityChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Quantity"
            />
        </div>

        {/* Purchase Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Purchase Price</span>
          </label>
            <input
              type="text"
              name="purchasePrice"
              value={formData.purchasePrice ?? 0}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Sale Price"
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
              value={formData.salePrice ?? 0}
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
              value={formData.mrp ?? 0}
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
              onChange={handleChange}
              value={calculateTotalAmount()}
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

        <div className="col-span-1 flex flex-col">
          <button
            type="button"
            onClick={handleAddItem}
            className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;