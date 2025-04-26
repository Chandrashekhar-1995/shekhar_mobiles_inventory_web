import React from "react";
import { useSelector } from "react-redux";

const DiscountSection = ({
  formData,
  setFormData,
  handleChange,
}) => {
  const logInUser = useSelector((store)=>store.user);
  const allUsers = useSelector((store) => store.allUsers.allUsers);

  const totalItemQuantity = formData.repairing.length;

  const handlefinalDiscountChange = (e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      discountAmount: value >= 0 ? value : 0,
    }));
  };
  return (
    <>
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Total Quantity</label>
          <input 
          type="text"  
          className="border bg-yellow-100 border-gray-300 rounded px-2 py-1 text-xs"
          value={totalItemQuantity}/>
      </div>

      {/* Sold by */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600"> Book By</label>
          <select
            name="bookBy"
            value={formData.bookBy}
            defaultValue={logInUser.name}
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            onChange={handleChange}
          >
            {allUsers && (
              allUsers.map((user) => (
                <option
                key={user._id} 
                value={user._id} >{user.name}</option>
              ))
            )}
          </select>
      </div>

                {/* Discount */}
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Discount Rs</label>
                </div>
                <div className="col-span-1 flex flex-col">
                  <input 
                  type="number" 
                  value={formData.discountAmount ?? ""}
                  onChange={handlefinalDiscountChange}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="discount in rs"/>
                </div>
                {/* Add Refrancey */}
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Add Refrance</label>    
                </div>
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600"></label>    
                </div>
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Add Shipping</label>    
                </div>
    </>
  )
}

export default DiscountSection;