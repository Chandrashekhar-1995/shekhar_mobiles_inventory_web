import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UsedItemsTable from "./UsedItemsTable";
import useFetchProducts from "../../../hooks/useFetchProducts";

const UsedItems = ({ formData, setFormData, handleChange }) => {
  const [queryItemCode, setQueryItemCode] = useState("");
  const [queryItemName, setQueryItemName] = useState("");
  const navigate = useNavigate();

  useFetchProducts();

  const allProducts = useSelector((store) => store.products.allProducts);

  const filteredByCode = queryItemCode === ""
    ? allProducts : allProducts?.filter((i) =>
        i.itemCode.toLowerCase().includes(queryItemCode.toLowerCase().trim())
      );

  const filteredByName = queryItemName ===""
    ? allProducts : allProducts?.filter((i) =>
        i.productName.toLowerCase().includes(queryItemName.toLowerCase().trim())
      );

  const handleSelect = (item) => {
    setFormData({
      ...formData,
      item: item._id,
      productName: item.productName,
      itemCode: item.itemCode,
      salePrice: item.salePrice,
      quantity: 1,
      unit: item.unit || "",
    });
    setQueryItemCode(item.itemCode);
    setQueryItemName(item.productName);
  };

  const handleCreateItem = () => {
    navigate("/product/create");
  };

  const handleAddUsedItem = (e) => {
    e.preventDefault()
    const { item, itemCode, productName, quantity, salePrice, unit, itemDescription } = formData;

    if (!item || !itemCode || !productName || !quantity || !salePrice) {
      alert("Please fill all required fields before adding an item.");
      return;
    }

    const newItem = {
      item,
      itemCode,
      productName,
      quantity,
      salePrice,
      unit,
      itemDescription,
      total: Number(quantity) * Number(salePrice),
    };

    setFormData((prev) => ({
      ...prev,
      usedItems: [...(prev.usedItems || []), newItem],
      item: "",
      itemCode: "",
      productName: "",
      quantity: "",
      unit: "",
      salePrice: "",
      itemDescription: "",
    }));

    setQueryItemCode("");
    setQueryItemName("");
  };

  return (
    <div className="overflow-x-auto border rounded-md relative min-h-[200px]" >

    <div className="border border-base-300 rounded-md shadow-md p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Item Code */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Item Code</span>
          </label>
          <Combobox value={formData.itemCode} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs w-full"
                onChange={(e) => setQueryItemCode(e.target.value)}
                displayValue={() => formData.itemCode || ""}
                placeholder="Type Item Code"
              />
              {filteredByCode?.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredByCode.map((item) => (
                    <Combobox.Option key={item._id} value={item} className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
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
        <div className="form-control">
          <label className="label justify-between">
            <span className="label-text text-xs">Item Name</span>
            <button
              type="button"
              onClick={handleCreateItem}
              className="text-xs text-blue-600 hover:underline"
            >
              + Add Product
            </button>
          </label>
          <Combobox value={formData.productName} onChange={handleSelect}>
            <div className="relative">
              <Combobox.Input
                className="input input-bordered input-sm text-xs w-full"
                onChange={(e) => setQueryItemName(e.target.value)}
                displayValue={() => formData.productName || ""}
                placeholder="Type Item Name"
              />
              {filteredByName?.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredByName.map((item) => (
                    <Combobox.Option key={item._id} value={item} className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                      {item.productName}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        {/* Quantity */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Quantity</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity || ""}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs"
            placeholder="Enter quantity"
          />
        </div>

        {/* Sale Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Sale Price</span>
          </label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice || ""}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs"
            placeholder="Sale Price"
          />
        </div>

        {/* Unit */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Unit</span>
          </label>
          <input
            type="text"
            name="unit"
            value={formData.unit || ""}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs"
            placeholder="Piece/Kg/Box"
          />
        </div>

        {/* Item Description */}
        <div className="form-control col-span-full">
          <label className="label">
            <span className="label-text text-xs">Description</span>
          </label>
          <input
            type="text"
            name="itemDescription"
            value={formData.itemDescription || ""}
            onChange={handleChange}
            className="input input-bordered input-sm text-xs"
            placeholder="Optional description"
          />
        </div>

        {/* Add Button */}
        <div className="form-control col-span-full">
          <button
            onClick={handleAddUsedItem}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white mt-2"
          >
            Use Item
          </button>
        </div>
      </div>

      {/* Show Table */}
      {formData.usedItems && formData.usedItems.length > 0 && (
        <div className="mt-6">
          <UsedItemsTable
            items={formData.usedItems}
            setFormData={setFormData}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default UsedItems;
