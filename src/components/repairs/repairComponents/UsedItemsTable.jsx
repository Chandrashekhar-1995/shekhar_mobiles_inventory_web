import React, { useState, useRef, useEffect } from "react";

const UsedItemsTable = ({ items, setFormData }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const tableRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      usedItems: prev.usedItems.filter((_, i) => i !== index),
    }));
    closeDropdown();
  };

  const handleEdit = (index) => {
    const itemToEdit = items[index];
    setFormData((prev) => ({
      ...prev,
      ...itemToEdit,
    }));
    closeDropdown();
  };

  const closeDropdown = () => {
    setDropdownIndex(null);
  };

  const handleRowClick = (e, index) => {
    // Prevent dropdown click from toggling again
    if (e.target.closest(".dropdown-menu")) return;
    
    // Get click position relative to the table
    const tableRect = tableRef.current.getBoundingClientRect();
    const clickX = e.clientX - tableRect.left;
    const clickY = e.clientY - tableRect.top;
    
    setDropdownPosition({
      top: clickY,
      left: clickX
    });
    
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="overflow-x-auto border rounded-md relative min-h-[200px]">
      <table className="table table-sm w-full" ref={tableRef}>
        <thead className="bg-base-200 text-xs">
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={index}
                className="hover cursor-pointer relative"
                onClick={(e) => handleRowClick(e, index)}
              >
                <td>{index + 1}</td>
                <td>{item.itemCode}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>{item.salePrice}</td>
                <td>{item.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No items added
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dropdown positioned absolutely relative to the table container */}
      {dropdownIndex !== null && (
        <div
          ref={dropdownRef}
          className="dropdown-menu absolute z-50 bg-white border rounded shadow text-xs w-24"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
        >
          <div
            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => handleEdit(dropdownIndex)}
          >
            Edit
          </div>
          <div
            className="px-3 py-2 hover:bg-red-100 cursor-pointer text-red-600"
            onClick={() => handleDelete(dropdownIndex)}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default UsedItemsTable;