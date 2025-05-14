import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import useFetchCustomers from "../../hooks/useFetchCustomers";

const capitalizeWords = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const CustomerDropdown = ({ formData, setFormData, handleChange }) => {
  const [queryNumber, setQueryNumber] = useState("");
  const [queryName, setQueryName] = useState("");
  const [customers, setCustomers] = useState([]);

  useFetchCustomers();

  const allCustomers = useSelector((store) => store.customers.allCustomers);

  useEffect(() => {
    if (allCustomers) {
      const filteredCustomers = allCustomers.filter(
        (customer) => customer?.designation === "customer"
      );
      setCustomers(filteredCustomers);
    }
  }, [allCustomers]);

  const filteredByNumber = queryNumber === "" ? customers : customers?.filter((c) =>
     c.mobileNumber?.includes(queryNumber.trim())
  );

  const filteredByName = queryName === "" ? customers : customers?.filter((c) =>
     c.name?.toLowerCase().includes(queryName.toLowerCase().trim())
  );

  const handleSelect = (customer) => {
    setFormData({
      ...formData,
      customerId: customer._id,
      customerName: customer.name,
      mobileNumber: customer.mobileNumber,
      address: capitalizeWords(customer.address),
    });
    setQueryNumber(customer.mobileNumber || "");
    setQueryName(customer.name || "");
  };

  return (
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
                  {customers && filteredByNumber.length > 0 && (
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
                <span className="label-text text-xs">Supplier Name</span>
              </label>
              <Combobox value={formData.customerName} onChange={handleSelect}>
                <div className="relative">
                  <Combobox.Input
                    className="input input-bordered input-sm text-xs"
                    onChange={(e) => setQueryName(e.target.value)}
                    displayValue={() => capitalizeWords(formData.customerName) || ""}
                    placeholder="Type Customer Name"
                  />
                  {customers && filteredByName.length > 0 && (
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
                          {capitalizeWords(customer.name)}
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
                value={capitalizeWords(formData.address)}
                onChange={handleChange}
                className="input input-bordered input-sm text-xs"
                placeholder="Address"
              />
            </div>
          </div>
        </div>
    );
};

export default CustomerDropdown;