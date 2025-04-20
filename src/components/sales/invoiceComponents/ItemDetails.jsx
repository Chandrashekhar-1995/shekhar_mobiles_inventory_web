import React from "react";

const ItemDetails = ({
  formData,
  handleChange,
  handleItemNameChange,
  handleItemCodeChange,
  handleQuantityChange,
  handleDiscountChange,
  calculateTotalAmount,
  showItemDropdown,
  showItemCodeDropdown,
  itemSuggestions,
  setShowItemDropdown,
  setShowItemCodeDropdown,
  handleAddItem,
  navigate
}) => {
  return (
    <div className="border border-gray-300 relative">
      <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
        Particulars
      </div>
      <div className="grid grid-cols-10 gap-4 items-center mx-2 mt-4 mb-2">
        {/* Item Code */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Item Code</label>
          <input
            type="text"
            name="itemCode"
            value={formData.itemCode}
            onChange={handleItemCodeChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="item code"
          />
          {/* Item Code Dropdown */}
          {showItemCodeDropdown && itemSuggestions.length > 0 && (
            <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
              {itemSuggestions.map((item) => (
                <li
                  key={item._id}
                  onClick={() => {
                    handleChange({
                      target: {
                        name: "itemCode",
                        value: item.itemCode,
                      },
                    });
                    handleChange({
                      target: {
                        name: "item",
                        value: item._id,
                      },
                    });
                    handleChange({
                      target: {
                        name: "productName",
                        value: item.productName,
                      },
                    });
                    handleChange({
                      target: {
                        name: "unit",
                        value: item.unit,
                      },
                    });
                    handleChange({
                      target: {
                        name: "salePrice",
                        value: item.salePrice,
                      },
                    });
                    handleChange({
                      target: {
                        name: "mrp",
                        value: item.mrp,
                      },
                    });
                    handleChange({
                      target: {
                        name: "quantity",
                        value: 1,
                      },
                    });
                    setShowItemCodeDropdown(false);
                  }}
                  className="px-2 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {item.itemCode}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Item Name */}
        <div className="col-span-3 flex flex-col">
          <div className="flex justify-between">
          <label className="text-xs font-medium text-gray-600">Item Name</label>
          <button className=" bg-primary text-white font-bold px-2" onClick={() => navigate("/product/create")}>+</button>
          </div>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleItemNameChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="item name"
          />
          {/* Item Name Dropdown */}
          {showItemDropdown && itemSuggestions.length > 0 && (
            <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
              {itemSuggestions.map((item) => (
                <li
                  key={item._id}
                  onClick={() => {
                    handleChange({
                      target: {
                        name: "itemCode",
                        value: item.itemCode,
                      },
                    });
                    handleChange({
                      target: {
                        name: "item",
                        value: item._id,
                      },
                    });
                    handleChange({
                      target: {
                        name: "productName",
                        value: item.productName,
                      },
                    });
                    handleChange({
                      target: {
                        name: "unit",
                        value: item.unit,
                      },
                    });
                    handleChange({
                      target: {
                        name: "salePrice",
                        value: item.salePrice,
                      },
                    });
                    handleChange({
                      target: {
                        name: "mrp",
                        value: item.mrp,
                      },
                    });
                    handleChange({
                      target: {
                        name: "quantity",
                        value: 1,
                      },
                    });
                    setShowItemDropdown(false);
                  }}
                  className="px-2 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {item.productName}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Unit */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="Unit"
          />
        </div>
        {/* Quantity */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity ?? ""}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="quantity"
          />
        </div>
        {/* Sale Price */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Sale Price</label>
          <input
            type="text"
            name="salePrice"
            value={formData.salePrice ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="Sale Price"
          />
        </div>
        {/* MRP */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">M.R.P.</label>
          <input
            type="text"
            name="mrp"
            value={formData.mrp ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="M.R.P."
          />
        </div>
        {/* Discount */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Disc (%)</label>
          <input
            type="number"
            value={formData.discount ?? ""}
            onChange={handleDiscountChange}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder="Enter discount %"
          />
        </div>
        {/* Amount */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Amount</label>
          <input
            type="text"
            value={calculateTotalAmount()}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            placeholder=""
            readOnly
          />
        </div>
      </div>
      {/* item description */}
      <div className="grid grid-cols-4 gap-4 items-center mx-2 mt-4 mb-4">
              <div className="col-span-3 flex flex-col">
                <input
                type="text"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="Item Description"
                />
              </div>
              <div className="col-span-1 flex flex-col">
              {/* Add Button */}
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
    </div>
  );
};

export default ItemDetails;