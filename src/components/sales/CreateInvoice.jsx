import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert } from '@mui/material';

const API_BASE_URL = "http://localhost:7777/api/v1/";

const CreateInvoice = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [customerType, setCustomerType] = useState("cash");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [itemSuggestions, setItemSuggestions] = useState([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [showItemCodeDropdown, setShowItemCodeDropdown] = useState(false);


  const [formData, setFormData] = useState({
    invoiceType:"Non GST",
    invoiceNumber: "",
    date: "",  
    dueDate: "",   
    placeOfSupply:"",
    billTo: "Cash",
    customer:"",
    customerName:"",
    mobileNumber:"",
    address:"",
    productName:"",
    itemCode:"",
    tag:undefined,
    quantity:undefined,
    unit:undefined,
    unitPrice:undefined,
    salePrice:undefined,
    mrp:undefined,
    netPrice:undefined,
    discount:undefined,
    total:undefined,
    items:[], // required
    totalAmount: undefined,             // required (calculat every items total)
    discountAmount: undefined,          // optional  (number, want to give discount on totalAmount )  
    totalPayableAmount: undefined,      // required   (totalAmount - discountAmount)
    paymentAccount: undefined,          // required (mongoose.Schema.Types.ObjectId == "Account")
    paymentDate: undefined,          // required (mongoose.Schema.Types.ObjectId == "Account")
    privateNote: "",                    // optional    
    customerNote: "",                   // optional   
    receivedAmount: undefined,          // optional   
    status:"Unpaid",                    // optional
    soldBy:undefined,                   // user id optional   
    deliveryTerm: "",                   // optional
  });

  useEffect(() => {
    const fetchLastInvoice = async () => {
      try {
        const response = await axios.get("http://localhost:7777/api/v1/invoice/last-invoice");
        if (response.data) {
          const lastInvoiceNumber = response.data.data.lastInvoice.invoiceNumber;
          const match = lastInvoiceNumber.match(/^([A-Za-z-]+)(\d+)$/);
          if (match) {
            const prefix = match[1];
            const numericPart = match[2];
            const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, '0');
            const nextInvoiceNumber = `${prefix}${nextNumber}`;
            setFormData((prev) => ({ ...prev, invoiceNumber: nextInvoiceNumber }));
          } else {
            console.error('Invalid invoice number format');
          }
        }
      } catch (error) {
        console.error("Error fetching the last invoice:", error);
      }
    };
  
    fetchLastInvoice();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today, paymentDate:today }));
  }, []);

  // useEffect(() => {
  //   console.log("Updated itemSuggestions:", itemSuggestions);
  // }, [itemSuggestions]);

  const seletedItems = [
    {
      srNumber:1,
      itemName:"ABC",
      tag:"abc",
      quantity:10,
      unit:"PCS",
      unitPrice:"PCS",
      untiPrice:20,
      netPrice:200,
      discount:10,
      totalAmount:180,
    },
    {
      srNumber:2,
      itemName:"ABC",
      tag:"abc",
      quantity:10,
      unit:"PCS",
      untiPrice:"PCS",
      unitPrice:20,
      netPrice:200,
      discount:10,
      totalAmount:180,
    },
    {
      srNumber:3,
      itemName:"ABC",
      tag:"abc",
      quantity:10,
      unit:"PCS",
      untiPrice:"PCS",
      unitPrice:20,
      netPrice:200,
      discount:10,
      totalAmount:180,
    },
  ]

  const fetchCustomerSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`${API_BASE_URL}auth/customer?search=${query}`);
      setCustomerSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    } else {
      setCustomerSuggestions([]);
    }
  };

  const handleCustomerNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, customerName: name }));
    if (name.length >= 2) {
      fetchCustomerSuggestions(name);
      setShowNameDropdown(true);
    } else {
      setShowNameDropdown(false);
    }
  };

  const handleMobileChange = (e) => {
    const mobile = e.target.value;
    setFormData((prev) => ({ ...prev, mobileNumber: mobile }));
    if (mobile.length >= 2) {
      fetchCustomerSuggestions(mobile);
      setShowMobileDropdown(true);
    } else {
      setShowMobileDropdown(false);
    }
  };

  const fetchItemSuggestions = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`${API_BASE_URL}product/auth/product?search=${query}`);
      setItemSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    } else {
      setItemSuggestions([]);
    }
  };

  const handleItemNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, productName: name }));
    if (name.length >= 2) {
      fetchItemSuggestions(name);
      setShowItemDropdown(true);
    } else {
      setShowItemDropdown(false);
    }
  };

  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    setFormData((prev) => ({ ...prev, itemCode: itemCode }));
    if (itemCode.length >= 2) {
      fetchItemSuggestions(itemCode);
      setShowItemCodeDropdown(true);
    } else {
      setShowItemCodeDropdown(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      quantity: isNaN(value) || value < 1 ? 1 : value, // Prevent negative or empty values
    }));
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      discount: value >= 0 ? value : 0,
    }));
  };

  const calculateTotalAmount = () => {
    const { quantity, salePrice, discount } = formData;
    if (!quantity || !salePrice) return "";
  
    const total = quantity * salePrice;
    return discount > 0 ? total - (total * discount) / 100 : total;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/invoice/create`,
        formData,
        {
          withCredentials:true
        }
      );
      setSuccessMessage("Customer Creared successful !");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100 ">
      <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
      <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Unsaved Invoice</h2>
          <button className="hover:bg-red-600 rounded-lg p-2"> X </button>

          {errorMessage && (
          <Alert severity="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
          {/* Invoice Details */}
          <div className="border border-gray-300 relative">
            <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
              Invoice information
            </div>

            {/* Invoice information */}
            <div className="grid grid-cols-3 gap-4 items-center mx-2 mt-4 mb-2">
              {/* Invoice Type */}
            <div className="col-span-1 flex flex-col">
                <label htmlFor="invoiceType" className="text-xs font-medium text-gray-600"> Invoice Type</label>
                <select id="invoiceType" name="invoiceType" className="border border-gray-300 rounded px-2 py-1 text-xs"  value={formData.invoiceType} onChange={handleChange}>
                    <option value="Non GST">Non GST</option>
                    <option value="GST">GST</option>
                    <option value="Bill of Supply">Bill of Supply</option>
                </select>
            </div>
            {/* Invoice Number */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600"> Invoice Number </label>
                <input type="text" name="invoiceNumber"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                value={formData.invoiceNumber} onChange={handleChange} 
                readOnly  />
            </div>
            {/* Invoice Date  */}
            <div className="col-span-1 flex flex-col">
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input type="date"  name="date"    
              className="border border-gray-300 rounded px-2 py-1 text-xs"
              value={formData.date || ""}  
              onChange=  {handleChange} />
            </div>
            </div>
            
            {/* Customer information */}
            <div className="grid grid-cols-4 gap-4 items-center mx-2 mt-4 mb-4">
              {/* Bill To */}
              <div className="col-span-1 flex flex-col">
              <label className="text-xs font-medium text-gray-600">Bill To</label>
                <div>
                  <label className="mr-4">
                    <input
                      type="radio"
                      value="cash"
                      className="mx-2"
                      checked={customerType === "cash"}
                      onChange={() => setCustomerType("cash")}
                    />{" "}
                    Cash
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="customer"
                      checked={customerType === "customer"}
                      onChange={() => setCustomerType("customer")}
                    />{" "}
                    Customer
                  </label>
                </div>
            </div>
            {/* Customer Search */}
              <div className="col-span-1 flex flex-col">
              <label className="text-xs font-medium text-gray-600">Mobile No</label>
                <input
                  type="text"
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
          setFormData({
            ...formData,
            customer: customer._id,
            customerName: customer.name,
            mobileNumber: customer.mobileNumber,
            address: customer.address,
          });
          setShowMobileDropdown(false); // Close the mobile dropdown
        }}
        className="px-2 py-2 cursor-pointer hover:bg-gray-200"
      >
        {customer.mobileNumber}
      </li>
    ))}
  </ul>
)}
              </div>
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
                          setFormData({
                            ...formData,
                            customer: customer._id,
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
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Address</label>
                <input
                type="text"
                value={formData.address}
                onChange={(e) => {
                  setSearchCustomer(e.target.value);
                  handleCustomerNameChange(e.target.value);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="Address"
                />
              </div>

            </div>
          </div>

          {/* Particulars */}
          <div className="border border-gray-300 relative">
            <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
              Particulars
            </div>

            {/* Product info & Calculation */}
            <div className="grid grid-cols-10 gap-4 items-center mx-2 mt-4 mb-2">

              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Item Code</label>
                <input
                  type="text"
                  value={formData.itemCode}
                  onChange={handleItemCodeChange}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="item code"
                />
                {/* Item code Dropdown */}
                {showItemCodeDropdown && itemSuggestions.length > 0 && (
                    <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
                      {itemSuggestions.map((item) => (
                            <li
                            key={item._id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                itemCode: item.itemCode,
                                productName: item.productName,
                                unit: item.unit,
                                salePrice: item.mrp,
                                mrp: item.mrp,
                                quantity:1,
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
              <div className="col-span-3 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Item Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={handleItemNameChange}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="item code"
                />
                {/* Item Name Dropdown */}
                  {showItemDropdown && itemSuggestions.length > 0 && (
                    <ul className="list-none border border-gray-300 bg-white max-h-40 overflow-y-auto absolute z-50 m-0 p-0">
                      {itemSuggestions.map((item) => (
                            <li
                            key={item._id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                itemCode: item.itemCode,
                                productName: item.productName,
                                unit: item.unit,
                                salePrice: item.mrp,
                                mrp: item.mrp,
                                quantity:1,
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
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Unit</label>
                <input
                  type="text"
                  value={formData.unit}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Unit"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Quantity</label>
                <input
                    type="number"
                    value={formData.quantity ?? ""}
                    onChange={(e) => handleQuantityChange(e)}
                    className="border border-gray-300 rounded px-2 py-1 text-xs"
                    placeholder="quantity"
                  />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Sale Price</label>
                <input
                  type="text"
                  value={formData.salePrice ?? ""}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Sale Price"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">M.R.P.</label>
                <input
                  type="text"
                  value={formData.mrp ?? ""}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="M.R.P."
                />
              </div>
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

            {/* Tag and item description */}
            <div className="grid grid-cols-4 gap-4 items-center mx-2 mt-4 mb-4">
              <div className="col-span-1 flex flex-col">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    <input
                      type="radio"
                      value="cash"
                      className="mx-2"
                      checked={customerType === "cash"}
                      onChange={() => setCustomerType("cash")}
                    />{" "}
                    Item Tag
                  </label>
                  <label className="text-xs font-medium text-gray-600 mx-4">
                    <input
                      type="radio"
                      value="customer"
                      checked={customerType === "customer"}
                      onChange={() => setCustomerType("customer")}
                    />{" "}
                    Item Code
                  </label>
                </div>
              </div>
              <div className="col-span-3 flex flex-col">
                <input
                type="text"
                value={searchCustomer}
                onChange={(e) => {
                  setSearchCustomer(e.target.value);
                  handleCustomerNameChange(e.target.value);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="Item Description"
                />
              </div>
            </div>

            {/* All Item as table */}
            <div className="bg-yellow-100 mx-2 mt-6 mb-4">
                <table className="w-full" style={{ height: "300px", tableLayout: "fixed" }}>
                  {/* Header */}
                  <thead className="bg-blue-500 text-white">
                      <tr className="bg-blue-500 text-white text-left">
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>S.No.</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "28%" }}>Item Name</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Tag</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Quantity</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Unit</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Unit Price</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Net Price</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Disc (%)</th>
                      <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "8%" }}>Amount</th>
                    </tr>
                  </thead>
                  {/* Body */}
                  <tbody className="align-top">
                      {seletedItems.length>0 && (
                        seletedItems.map((item, index) =>(
                          <tr key={index} className="text-gray-700 align-top">
                            <td className="px-4 py-2">{item.srNumber}</td>
                            <td className="px-4 py-2">{item.itemName}</td>
                            <td className="px-4 py-2">{item.tag}</td>
                            <td className="px-4 py-2">{item.quantity}</td>
                            <td className="px-4 py-2">{item.unit}</td>
                            <td className="px-4 py-2">{item.unitPrice}</td>
                            <td className="px-4 py-2">{item.netPrice}</td>
                            <td className="px-4 py-2">{item.discount}</td>
                            <td className="px-4 py-2">{item.totalAmount}</td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
            </div>
          </div>

          {/* Total amount etc */}
          <div>
            <div className="grid grid-cols-4 gap-4 mx-2 mt-4 mb-2">
            <div className="col-span-1 grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Total Quantity</label>
                    <input type="text"  className="border bg-yellow-100 border-gray-300 rounded px-2 py-1 text-xs"/>
                </div>

                {/* Sold by */}
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600"> Sold By</label>
                    <select
                      name="category"
                      className="border border-gray-300 rounded px-2 py-1 text-xs"
                      required
                    >
                      <option value="user1" >User 1</option>
                      <option value="user2" >User 2</option>
                      <option value="user3" >User 3</option>
                    </select>
                </div>

                {/* Discount */}
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Discount</label>
                </div>
                <div className="col-span-1 flex flex-col">
                  <input type="text"  className="border border-gray-300 rounded px-2 py-1 text-xs"/>
                </div>
                {/* Sold by */}
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Add Refrance</label>    
                </div>
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600"></label>    
                </div>
                <div className="col-span-1 flex flex-col">
                    <label className="text-xs font-medium text-gray-600">Add Shipping</label>    
                </div>
            </div>

            {/* notes */}
            <div className="col-span-1 flex flex-col">
              <div className="border border-gray-300 mb-2 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold"> Delivery Terms
                </div>
                <div className="mt-3 m-1">
                  <textarea name="" className="bg-white w-full border-b border-gray-400">
                  </textarea>
                </div>
              </div>
              <div className="border border-gray-300 mt-2 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold"> Remarks (Private use)
                </div>
                <div className="mt-3 m-1">
                  <textarea name="" className="bg-white w-full border-b border-gray-400">
                  </textarea>
                </div>
              </div>
            </div>

            {/* Payment  */}
            <div className="col-span-1 flex flex-col shadow-lg p-2 relative">
              <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                Payment
              </div>

              <div className="col-span-1 grid grid-cols-3 gap-1">
                    <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Date</label>
                    <input 
                    type="date"  
                    name="paymentDate" 
                    value={formData.paymentDate}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"/>

                {/* Mode */}
                    <label className="text-xs font-medium text-gray-600 col-span-1">Mode</label>
                    <select
                      name="category"
                      className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"
                      required
                    >
                      <option value="user1" >Cash</option>
                      <option value="user2" >Phone Pay</option>
                      <option value="user3" >Bharat Pay</option>
                    </select>

                {/* Tranxation Id */}
                    <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Txn. ID</label>
                    <input 
                    type="text" name="dateOfBirth" className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"/>
                {/* Amount */}
                    <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Amount</label>
                    <input 
                    type="text" name="dateOfBirth" className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"/>
              </div>
            </div>

            {/* Total Amount */}
            <div className="col-span-1 flex flex-col shadow-lg p-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-600">
                  Total Amount:
                </label>
                <span className="text-sm font-medium text-gray-800">₹ 00.00{formData.items?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>

          </div>
          </div>

          {/* Tools and Submit Button */}
          <div className="bg-gray-300 my-2 p-2 flex justify-between">
            <div className="">comming soon tools</div>
            <div className="flex justify-between ">
              {/* Total Amount */}
                <div className="flex justify-between items-center mr-8 ">
                  <label className="font-medium text-gray-600 px-4">
                    Balance:
                  </label>
                  <span className="font-medium text-gray-800 w-20">₹ 00.00 </span>
                </div>
              <Button type="submit" variant="contained" fullWidth className="bg-blue-500 hover:bg-blue-600 text-white" disabled={loading} >
                  {loading ? <CircularProgress size={24} className="text-white" /> : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice