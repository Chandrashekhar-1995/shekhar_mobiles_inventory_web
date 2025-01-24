import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert } from '@mui/material';

const CreateInvoice = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [customerType, setCustomerType] = useState("cash");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customerSuggestions, setCustomerSuggestions] = useState([]);

  const [formData, setFormData] = useState({
    invoiceType:"Non GST",         // optional dropdown ["Non GST", "GST", "Bill of Supply"]
    invoiceNumber: undefined,      // required   auto generate
    date: undefined,              // required   
    dueDate: undefined,           // optional   
    placeOfSupply:undefined,      // optional (state)
    billTo: "Cash",               // optional (radio button ["Cash", "Customer"]) 
    customer:undefined,           // optional (if billTo==="Customer" then select customer from database)  
    items:undefined,              // required
    //( in items section includes = 
    // [
    // item all details fetch from item database and auto fill in below fields
    // unit
    // quantity
    // salePrice
    // mrp
    // discount
    // tax
    // cess
    // total   (quantity*salePrice)-discount
    //])
    totalAmount: undefined,             // required (calculat every items total)
    discountAmount: undefined,          // optional  (number, want to give discount on totalAmount )  
    totalPayableAmount: undefined,      // required   (totalAmount - discountAmount)
    paymentAccount: undefined,          // required (mongoose.Schema.Types.ObjectId == "Account")
    privateNote: "",                    // optional    
    customerNote: "",                   // optional   
    receivedAmount: undefined,          // optional   
    status:"Unpaid",                    // optional
    soldBy:undefined,                   // user id optional   
    deliveryTerm: "",                   // optional
  });

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

  const handleCustomerSearch = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get(`/api/customers?search=${query}`);
        setCustomerSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    } else {
      setCustomerSuggestions([]);
    }
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
        "http://localhost:7777/api/v1/auth/customer/create",
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
      <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Unsaved Invoice</h2>
          <button onClick={console.log("go back clicked")} className="hover:bg-red-600 rounded-lg p-2"> X </button>

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
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Invoice Details */}
          <div className="border border-gray-300 relative">
            <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
              Invoice information
            </div>

            {/* Invoice information */}
            <div className="grid grid-cols-3 gap-4 items-center mx-2 mt-4 mb-2">
              {/* Invoice Type */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600"> Invoice Type</label>
                <input type="text" name="invoiceType" 
                className="border border-gray-300 rounded px-2 py-1 text-xs"  value={formData.invoiceType} onChange={handleChange} />
            </div>
            {/* Invoice Number */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600"> Invoice Number </label>
                <input type="text" name="documentNo" 
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                value={formData.documentNo} onChange={handleChange} />
            </div>
            {/* Invoice Date  */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Date</label>
              <input type="date"  name="dateOfBirth"    
              className="border border-gray-300 rounded px-2 py-1 text-xs"
              value={formData.dateOfBirth}  
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
                  value={searchCustomer}
                  onChange={(e) => {
                    setSearchCustomer(e.target.value);
                    handleCustomerSearch(e.target.value);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Type Customer Number"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Customer Name</label>
                <input
                type="text"
                value={searchCustomer}
                onChange={(e) => {
                  setSearchCustomer(e.target.value);
                  handleCustomerSearch(e.target.value);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                placeholder="Type Customer Name"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Address</label>
                <input
                type="text"
                value={searchCustomer}
                onChange={(e) => {
                  setSearchCustomer(e.target.value);
                  handleCustomerSearch(e.target.value);
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
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Item Code"
                />
              </div>
              <div className="col-span-3 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Item Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Item Name"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Unit</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Unit"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Quantity</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Quantity"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Sale Price</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="Sale Price"
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">M.R.P.</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="M.R.P."
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Disc (%)</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder=""
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Amount</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder=""
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
                  handleCustomerSearch(e.target.value);
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
            <div className="grid grid-cols-3 gap-4 items-center mx-2 mt-4 mb-2">
            <div className="col-span-1 grid grid-cols-2 gap-4 items-center">
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
            </div>
            {/* Invoice Number */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600"> Invoice Number </label>
                <input type="text" name="documentNo" 
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                value={formData.documentNo} onChange={handleChange} />
            </div>
            {/* Invoice Date  */}
            <div className="col-span-1 flex flex-col">
                <label className="text-xs font-medium text-gray-600">Date</label>
              <input type="date"  name="dateOfBirth"    
              className="border border-gray-300 rounded px-2 py-1 text-xs"
              value={formData.dateOfBirth}  
              onChange=  {handleChange} />
            </div>
            </div>

          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice