import React, { useEffect, useState } from "react";
import { createNewInvoice, lastInvoice, updateInvoice } from "../../../service/invoiceApi";
import InvoiceDetails from "./invoiceComponents/InvoiceDetails";
import ItemDetails from "./invoiceComponents/ItemDetails";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import BillToType from "./invoiceComponents/BillToType";
import useFetchProducts from "../../hooks/useFetchProducts";
import InvoiceTable from "./invoiceComponents/InvoiceTable";
import OtherSection from "./invoiceComponents/OtherSection";
import useFetchUsers from "../../hooks/useFetchUsers";
import SubmitSection from "./invoiceComponents/SubmitSection";
import { toast } from "react-toastify";

const CreateInvoice = ({ isEditMode = false, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoiceType: "non_gst",
    invoiceNumber: "INV-0001",
    date: "",
    dueDate: "",
    placeOfSupply: "",
    billTo: "Cash",
    customerId: "",
    customerName: "Cash",
    mobileNumber: "",
    address: "",
    item: "",
    productName: "",
    itemCode: "",
    unit: "",
    quantity: 0,
    salePrice: 0,
    mrp: 0,
    discount: 0,
    total: 0,
    itemDescription: "",
    unitPrice: 0,
    netPrice: 0,
    items: [],
    totalAmount: 0,
    discountAmount:0,
    totalPayableAmount: 0,
    paymentDate: "",
    paymentMode: "Cash",
    privateNote: "",
    customerNote: "",
    receivedAmount: 0,
    advanceAmount: 0,
    transactionId: "",
    status: "Unpaid",
    soldBy: "",
    deliveryTerm: "",
    srNumber: "",
  });

  useFetchCustomers();
  useFetchProducts();
  useFetchUsers();

  // fetch last invoice
  useEffect(() => {
    const fetchLastInvoice = async () => {
      try {
        const data = await lastInvoice();
        if (data.success) { 
          const lastInvoiceNumber = data.data.lastInvoice.invoiceNumber;
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

  // date set today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today, paymentDate: today }));
  }, []);

  const handleClose = () => {
    if(onClose) {
      onClose();
    } else if (showModal){
      setShowModal(false); 
    } else {
      navigate(-1); 
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value === '' ? 0 : Number(value)) : value;

    if(name === "billTo" && value === "Cash"){
      setFormData((prev) => ({ ...prev, customerName: "Cash", address: "", mobileNumber: "" }));
    }

    if(name === "billTo" && value === "Customer"){
      setFormData((prev) => ({ ...prev, customerName: "", address: "", mobileNumber: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const totalItemPrice = formData.items.reduce(
    (total, item) => total + (Number(item.total) || 0), 
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(isEditMode){
        const data = await updateInvoice(formData);
        if (data.success) { 
          toast.success(`✅ ${data.message}`)
          setShowModal(false);
        } else {
          toast.error(`❌ ${data.message}` || "Update invoice failed");
        }
      } else {
        const data = await createNewInvoice(formData);
        if (data.success) { 
          toast.success(`✅ ${data.message}`)
          setShowModal(false);
        } else {
          toast.error(`❌ ${data.message}` || "Invoice creation failed");
        }
      }
    } catch (error) {
      toast.error(`❌ An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Invoice
      </button>

      {showModal && (
        <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100">
          <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold mb-4 text-sm">
                {isEditMode ? "Edit Invoice" : "Unsaved Invoice"}
              </h2>
              <button 
                className="hover:bg-red-600 rounded-lg p-2" 
                onClick={() => handleClose()}
              > 
                X 
              </button>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
              {/* Invoice Details */}
              <InvoiceDetails formData={formData} handleChange={handleChange} />

              {/* Bill To */}
              <BillToType
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />
              
              <ItemDetails
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />

              {/* Show Table */}
              {formData.items && formData.items.length > 0 && (
                <div className="mt-6">
                  <InvoiceTable
                    items={formData.items}
                    setFormData={setFormData}
                  />
                </div>
              )}

              {/* Total amount etc */}
              <OtherSection
                formData={formData}
                setFormData={setFormData}
                totalItemPrice={totalItemPrice}
                handleChange={handleChange}
              />

              {/* Submit Section */}
              <SubmitSection
                formData={formData}
                totalItemPrice={totalItemPrice}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
};

export default CreateInvoice;