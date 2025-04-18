// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {API_BASE_URL} from "../../utils/const";
// import { useNavigate, useParams } from 'react-router-dom';
// import { Alert, Dialog } from "@mui/material";
// import InvoiceDetails from "./CreateInvoice/InvoiceDetails";
// import CustomerDetails from "./CreateInvoice/CustomerDetails";
// import ItemDetails from "./CreateInvoice/ItemDetails";
// import InvoiceTable from "./CreateInvoice/InvoiceTable";
// import PaymentDetails from "./CreateInvoice/PaymentDetails";
// import InvoiceSummary from "./CreateInvoice/InvoiceSummary";
// import SubmitSection from "./CreateInvoice/SubmitSection";
// import DiscountSection from "./CreateInvoice/DiscountSection";
// import NotesSection from "./CreateInvoice/NotesSection";

// const CreateInvoice = ({ isEditMode = false, onClose }) => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [errorMessage, setErrorMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");
//     const [customerSuggestions, setCustomerSuggestions] = useState([]);
//     const [showNameDropdown, setShowNameDropdown] = useState(false);
//     const [showMobileDropdown, setShowMobileDropdown] = useState(false);
//     const [itemSuggestions, setItemSuggestions] = useState([]);
//     const [showItemDropdown, setShowItemDropdown] = useState(false);
//     const [showItemCodeDropdown, setShowItemCodeDropdown] = useState(false);
//   const [formData, setFormData] = useState({
//       invoiceType: "Non GST",
//       invoiceNumber: "",
//       date: "",
//       dueDate: "",
//       placeOfSupply: "",
//       billTo: "Cash",
//       customerId: "",
//       customerName: "Cash",
//       mobileNumber: "",
//       address: "",
//       item: "",
//       productName: "",
//       itemCode: "",
//       unit: "",
//       quantity: "",
//       salePrice: "",
//       mrp: "",
//       discount: "",
//       total: "",
//       itemDescription: "",
//       unitPrice: "",
//       netPrice: "",
//       items: [],
//       totalAmount: "",
//       discountAmount: "",
//       totalPayableAmount: "",
//       paymentDate: "",
//       paymentMode: "Cash",
//       privateNote: "",
//       customerNote: "",
//       receivedAmount: "",
//       transactionId:"",
//       status: "Unpaid",
//       soldBy: "",
//       deliveryTerm: "",
//       srNumber: "",
//     });

//     // fetch invoice details if edit
//     useEffect(() => {
//         const fetchInvoiceData = async () => {
//         if (isEditMode && id) {
//           try {
//               const response = await axios.get(`${API_BASE_URL}invoice/${id}`);
//             if (response.data && response.data.data) {
//             setFormData(response.data.data.invoice);
//           }
//             } catch (error) {
//                 console.error('Error fetching invoice data:', error);
//                 setErrorMessage('Failed to load invoice data.');
//         }
//       }
//     };

//     fetchInvoiceData();
//     }, [isEditMode, id]);

//     // fetch last invoice
//     useEffect(() => {
//         const fetchLastInvoice = async () => {
//           try {
//             const response = await axios.get(`${API_BASE_URL}invoice/last-invoice`);
//             if (response.data) {
//               const lastInvoiceNumber = response.data.data.lastInvoice.invoiceNumber;
//               const match = lastInvoiceNumber.match(/^([A-Za-z-]+)(\d+)$/);
//               if (match) {
//                 const prefix = match[1];
//                 const numericPart = match[2];
//                 const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, '0');
//                 const nextInvoiceNumber = `${prefix}${nextNumber}`;
//                 setFormData((prev) => ({ ...prev, invoiceNumber: nextInvoiceNumber }));
//               } else {
//                 console.error('Invalid invoice number format');
//               }
//             }
//           } catch (error) {
//             console.error("Error fetching the last invoice:", error);
//           }
//         };
    
//         fetchLastInvoice();
//       }, []);
    
//     // date set today
//     useEffect(() => {
//         const today = new Date().toISOString().split("T")[0];
//         setFormData((prev) => ({ ...prev, date: today, paymentDate: today }));
//       }, []);

//       const handleClose = () => {
//         if(onClose) {
//           onClose();
//         } else {
//           navigate(-1); 
//         }
//       };

//       const fetchCustomerSuggestions = async (query) => {
//         if (query.length > 1) {
//           try {
//             const response = await axios.get(`${API_BASE_URL}auth/customer?search=${query}`);
//             setCustomerSuggestions(response.data.data);
//           } catch (error) {
//             console.error("Error fetching customers:", error);
//           }
//         } else {
//           setCustomerSuggestions([]);
//         }
//       };
    
//       const handleCustomerNameChange = (e) => {
//         const name = e.target.value;
//         setFormData((prev) => ({ ...prev, customerName: name }));
//         if (name.length >= 2) {
//           fetchCustomerSuggestions(name);
//           setShowNameDropdown(true);
//         } else {
//           setShowNameDropdown(false);
//         }
//       };
    
//       const handleMobileChange = (e) => {
//         const mobile = e.target.value;
//         setFormData((prev) => ({ ...prev, mobileNumber: mobile, }));
//         if (mobile.length >= 2) {
//           fetchCustomerSuggestions(mobile);
//           setShowMobileDropdown(true);
//         } else {
//           setShowMobileDropdown(false);
//         }
//       };
    
//       const fetchItemSuggestions = async (query) => {
//         if (query.length > 1) {
//           try {
//             const response = await axios.get(`${API_BASE_URL}product/auth/product?search=${query}`);
//             setItemSuggestions(response.data.data);
//           } catch (error) {
//             console.error("Error fetching items:", error);
//           }
//         } else {
//           setItemSuggestions([]);
//         }
//       };
    
//       const handleItemNameChange = (e) => {
//         const name = e.target.value;
//         setFormData((prev) => ({ ...prev, productName: name }));
//         if (name.length >= 2) {
//           fetchItemSuggestions(name);
//           setShowItemDropdown(true);
//         } else {
//           setShowItemDropdown(false);
//         }
//       };
    
//       const handleItemCodeChange = (e) => {
//         const itemCode = e.target.value;
//         setFormData((prev) => ({ ...prev, itemCode: itemCode }));
//         if (itemCode.length >= 2) {
//           fetchItemSuggestions(itemCode);
//           setShowItemCodeDropdown(true);
//         } else {
//           setShowItemCodeDropdown(false);
//         }
//       };

//       const handleQuantityChange = (e) => {
//         const value = parseInt(e.target.value, 10);
//         setFormData((prev) => ({
//           ...prev,
//           quantity: isNaN(value) || value < 1 ? 1 : value,
//         }));
//       };
    
//       const handleDiscountChange = (e) => {
//         const value = e.target.value === "" ? "" : parseFloat(e.target.value);
//         setFormData((prev) => ({
//           ...prev,
//           discount: value >= 0 ? value : 0,
//         }));
//       };
    
//       const handlefinalDiscountChange = (e) => {
//         const value = e.target.value === "" ? "" : parseFloat(e.target.value);
//         setFormData((prev) => ({
//           ...prev,
//           discountAmount: value >= 0 ? value : 0,
//         }));
//       };
    
//       const calculateTotalAmount = () => {
//         const { quantity, salePrice, discount } = formData;
//         if (!quantity || !salePrice) return "";
    
//         const total = quantity * salePrice;
//         return discount > 0 ? total - (total * discount) / 100 : total;
//       };
    
//       const handleAddItem = (event) => {
//         event.preventDefault();
    
//         const { item, itemCode, productName, quantity, unit, salePrice, mrp, discount, itemDescription } = formData;
    
//         if (!productName || !quantity || !salePrice) {
//           alert("Please fill in all required fields before adding an item.");
//           return;
//         }
    
//         const newItem = {
//           item,
//           itemCode,
//           productName,
//           quantity: quantity || 1,
//           unit,
//           salePrice,
//           mrp,
//           discount: discount || 0,
//           total: calculateTotalAmount(),
//           itemDescription,
//         };
    
//         setFormData((prev) => ({
//           ...prev,
//           items: [...prev.items, newItem],
//           itemCode: "",
//           productName: "",
//           quantity: "",
//           unit: "",
//           salePrice: "",
//           mrp: "",
//           discount: "",
//           itemDescription: "",
//         }));
//       };

//       const totalItemPrice = formData.items.reduce((total, item) => total + item.total, 0);

//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         if (name === "salePrice" && !/^\d*\.?\d*$/.test(value)) {
//           return;
//         }
    
//         if(name==="billTo" && value==="Cash"){
//           setFormData((prev) => ({ ...prev, customerName: "Cash", address:"", mobileNumber:"" }));
//         }
    
//         if(name==="billTo" && value==="Customer"){
//           setFormData((prev) => ({ ...prev, customerName: "", address:"", mobileNumber:"" }));
//         }
    
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMessage("");
//         setSuccessMessage("");

//         try {
//             if (isEditMode) {
//                 await axios.patch(`${API_BASE_URL}invoice/${id}`, formData, {
//                 withCredentials: true,
//                 });
//                 setSuccessMessage('Invoice updated successfully!');
//             } else {
//                 await axios.post(`${API_BASE_URL}invoice/create`, formData, {
//                 withCredentials: true,
//                 });
//                 setSuccessMessage('Invoice created successfully!');
//             }
//             navigate("/auth/admin"); 
//         } catch (err) {
//             setErrorMessage(err.response?.data?.message || 'An unexpected error occurred' );
//         } finally {
//             setLoading(false);
//         }
//         };

//   return (
//     <Dialog 
//       open={true} 
//       onClose={handleClose} 
//       fullWidth 
//       maxWidth="lg"
//     >
//         <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100 ">
//       <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
//         <div className="flex items-center justify-between">
//           <h2 className="font-semibold mb-4 text-sm">{isEditMode ? "Edit Invoice" : "Unsaved Invoice"}</h2>
//           <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => handleClose()}
//             > X </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
//           {/* Invoice Details */}
//           <InvoiceDetails formData={formData} handleChange={handleChange} />

//           {/* Customer Details */}
//           <CustomerDetails
//             formData={formData}
//             setFormData={setFormData}
//             handleChange={handleChange}
//             handleCustomerNameChange={handleCustomerNameChange}
//             handleMobileChange={handleMobileChange}
//             showNameDropdown={showNameDropdown}
//             showMobileDropdown={showMobileDropdown}
//             customerSuggestions={customerSuggestions}
//             setShowNameDropdown={setShowNameDropdown}
//             setShowMobileDropdown={setShowMobileDropdown}
//             navigate={navigate}
//           />

//           {/* Item Details */}
//           <ItemDetails
//             formData={formData}
//             handleChange={handleChange}
//             handleItemNameChange={handleItemNameChange}
//             handleItemCodeChange={handleItemCodeChange}
//             handleQuantityChange={handleQuantityChange}
//             handleDiscountChange={handleDiscountChange}
//             calculateTotalAmount={calculateTotalAmount}
//             showItemDropdown={showItemDropdown}
//             showItemCodeDropdown={showItemCodeDropdown}
//             itemSuggestions={itemSuggestions}
//             setShowItemDropdown={setShowItemDropdown}
//             setShowItemCodeDropdown={setShowItemCodeDropdown}
//             handleAddItem={handleAddItem}
//             navigate={navigate}
//           />


//           {/* Invoice Table */}
//           <InvoiceTable formData={formData} />

//           {/* Total amount etc */}
//           <div className="grid grid-cols-4 gap-4 mx-2 mt-4 mb-2">
//             {/* discount section */}
//             <div className="col-span-1 grid grid-cols-2 gap-4">
//               <DiscountSection 
//               formData={formData}
//               handleChange={handleChange}
//               handlefinalDiscountChange={handlefinalDiscountChange}
//               />
//             </div>

//             {/* notes */}
//             <div className="col-span-1 flex flex-col">
//               <NotesSection
//               formData={formData}
//               handleChange={handleChange}
//               />
//             </div>

//             {/* Payment Details */}
//             <div className="col-span-1 flex flex-col shadow-lg p-2 relative">
//               <PaymentDetails formData={formData} handleChange={handleChange} />
//             </div>

//             {/* Invoice Summary */}
//             <div className="col-span-1 flex flex-col shadow-lg p-2">
//               <InvoiceSummary formData={formData} totalItemPrice={totalItemPrice} />
//             </div>

//           </div>

//           {errorMessage && (
//             <Alert severity="error" className="mb-4">
//               {errorMessage}
//             </Alert>
//           )}
//           {successMessage && (
//             <Alert severity="success" className="mb-4">
//               {successMessage}
//             </Alert>
//           )}

//           {/* Submit Section */}
//           <SubmitSection
//             formData={formData}
//             totalItemPrice={totalItemPrice}
//             loading={loading}
//             handleSubmit={handleSubmit}
//           />
//         </form>
//       </div>
//     </div>
//     </Dialog>
//   );
// };

// export default CreateInvoice;



import React from 'react'

const CreateInvoice = () => {
  return (
    <div>CreateInvoice</div>
  )
}

export default CreateInvoice