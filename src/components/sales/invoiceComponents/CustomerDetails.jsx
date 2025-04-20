import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";

const CustomerDetails = ({ formData, setFormData, handleChange }) => {
  const [queryNumber, setQueryNumber] = useState("");
  const [queryName, setQueryName] = useState("");

  const allCustomers = useSelector((store) => store.customers.allCustomers);

  const filteredByNumber = queryNumber
    ? allCustomers.filter((c) =>
        c.mobileNumber.includes(queryNumber.trim())
      )
    : [];

  const filteredByName = queryName
    ? allCustomers.filter((c) =>
        c.name.toLowerCase().includes(queryName.toLowerCase().trim())
      )
    : [];

  const handleSelect = (customer) => {
    setFormData({
      ...formData,
      customerId: customer._id,
      customerName: customer.name,
      mobileNumber: customer.mobileNumber,
      address: customer.address,
    });
    setQueryNumber(customer.mobileNumber);
    setQueryName(customer.name);
  };

  return (
    allCustomers && (
      <div >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {/* Mobile Number */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xs">Mobile No</span>
            </label>
            <Combobox value={formData.mobileNumber} onChange={handleSelect}>
              <div className="relative">
                <Combobox.Input
                  className="input input-bordered input-sm text-xs"
                  onChange={(e) => setQueryNumber(e.target.value)}
                  displayValue={() => formData.mobileNumber || ""}
                  placeholder="Type Customer Number"
                />
                {filteredByNumber.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredByNumber.map((customer) => (
                      <Combobox.Option
                        key={customer._id}
                        value={customer}
                        className={({ active }) =>
                          `cursor-pointer px-4 py-2 ${
                            active ? "bg-blue-500 text-white" : "text-black"
                          }`
                        }
                      >
                        {customer.mobileNumber}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          {/* Customer Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">Customer Name</span>
            </label>
            <Combobox value={formData.customerName} onChange={handleSelect}>
              <div className="relative">
                <Combobox.Input
                  className="input input-bordered input-sm text-xs"
                  onChange={(e) => setQueryName(e.target.value)}
                  displayValue={() => formData.customerName || ""}
                  placeholder="Type Customer Name"
                />
                {filteredByName.length > 0 && (
                  <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredByName.map((customer) => (
                      <Combobox.Option
                        key={customer._id}
                        value={customer}
                        className={({ active }) =>
                          `cursor-pointer px-4 py-2 ${
                            active ? "bg-blue-500 text-white" : "text-black"
                          }`
                        }
                      >
                        {customer.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}
              </div>
            </Combobox>
          </div>

          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xs">Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered input-sm text-xs"
              placeholder="Address"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CustomerDetails;
