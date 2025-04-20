import React from "react";

const CustomerDetails = ({
  formData,
  setFormData,
  handleChange,
  // handleCustomerNameChange,
  // handleMobileChange,
  // showNameDropdown,
  // showMobileDropdown,
  // customerSuggestions,
  // setShowNameDropdown,
  // setShowMobileDropdown,
  // navigate
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center mx-2 mt-4 mb-4">
      {/* Bill To */}
      <div className="col-span-1 flex flex-col">
        <div className="flex justify-between">
        <label className="text-xs font-medium text-gray-600">Bill To</label>
        {formData.billTo==="Customer" &&
          <button className=" bg-primary text-white font-bold px-2" onClick={() => navigate("/auth/user/customer/create")}>+</button>
        }
        </div>
        <div>
          <label className="mr-4">
            <input
              type="radio"
              value="Cash"
              name="billTo"
              className="mx-2"
              checked={formData.billTo === "Cash"}
              onChange={(e) => handleChange(e)}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              value="Customer"
              name="billTo"
              checked={formData.billTo === "Customer"}
              onChange={(e) => handleChange(e)}
            />
            Customer
          </label>
        </div>
      </div>
      {/* Mobile Number */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Mobile No</label>
        <input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleMobileChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
          placeholder="Type Customer Number"
        />
        {/* Mobile Dropdown */}
        {showMobileDropdown && customerSuggestions.length > 0 && (
          <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
            {customerSuggestions.map((customer) => (
              <li
                key={customer._id}
                onClick={() => {
                  handleChange({
                    target: {
                      name: "mobileNumber",
                      value: customer.mobileNumber,
                    },
                  });
                  handleChange({
                    target: {
                      name: "customerName",
                      value: customer.name,
                    },
                  });
                  handleChange({
                    target: {
                      name: "address",
                      value: customer.address,
                    },
                  });
                  setFormData({
                    ...formData,
                    customerId: customer._id,
                    customerName: customer.name,
                    mobileNumber: customer.mobileNumber,
                    address: customer.address,
                  });
                  setShowMobileDropdown(false);
                }}
                className="px-2 py-2 cursor-pointer hover:bg-gray-200"
              >
                {customer.mobileNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Customer Name */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={handleCustomerNameChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
          placeholder="Type Customer Name"
        />
        {/* Name Dropdown */}
        {showNameDropdown && customerSuggestions.length > 0 && (
          <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
            {customerSuggestions.map((customer) => (
              <li
                key={customer._id}
                onClick={() => {
                  handleChange({
                    target: {
                      name: "mobileNumber",
                      value: customer.mobileNumber,
                    },
                  });
                  handleChange({
                    target: {
                      name: "customerName",
                      value: customer.name,
                    },
                  });
                  handleChange({
                    target: {
                      name: "address",
                      value: customer.address,
                    },
                  });
                  setFormData({
                    ...formData,
                    customerId: customer._id,
                    customerName: customer.name,
                    mobileNumber: customer.mobileNumber,
                    address: customer.address,
                  });
                  setShowNameDropdown(false);
                }}
                className="px-2 py-2 cursor-pointer hover:bg-gray-200"
              >
                {customer.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Address */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
          placeholder="Address"
        />
      </div>
    </div>
  );
};

export default CustomerDetails;