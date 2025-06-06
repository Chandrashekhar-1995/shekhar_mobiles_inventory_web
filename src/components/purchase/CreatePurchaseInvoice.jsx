import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { lastPurchaseInvoice, createNewPurchaseInvoice, updatePurchaseInvoice } from "../../../service/purchaseInvoiceApi";
import InvoiceDetails from "../sales/invoiceComponents/InvoiceDetails";
import BillFromType from "./invoiceComponents/BillFromType";
import ItemDetails from "./invoiceComponents/ItemDetails";
import InvoiceTable from "./invoiceComponents/InvoiceTable";
import OtherSection from "../sales/invoiceComponents/OtherSection";
import SubmitSection from "../sales/invoiceComponents/SubmitSection";

const CreatePurchaseInvoice = ({ isEditMode = false, showPurchaseModal, setShowPurchaseModal, onClose, open }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      invoiceType: "non_gst",
      invoiceNumber: "PINV-0001",
      date: "",
      dueDate: "",
      placeOfSupply: "",
      billFrom: "Cash",
      supplier: "",
      supplierName: "Cash",
      mobileNumber: "",
      address: "",
      item: "",
      productName: "",
      itemCode: "",
      unit: "",
      quantity: 0,
      salePrice: 0,
      purchasePrice:0,
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

    // fetch last invoice
  useEffect(() => {
    const fetchLastInvoice = async () => {
      try {
        const data = await lastPurchaseInvoice();
        if (data.success) { 
          const lastInvoiceNumber = data.data.lastPurchaseInvoice.invoiceNumber;
          const match = lastInvoiceNumber.match(/^([A-Za-z-]+)(\d+)$/);

          if (match) {
            const prefix = match[1];
            const numericPart = match[2];
            const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, "0");
            const nextInvoiceNumber = `${prefix}${nextNumber}`;
            setFormData((prev) => ({ ...prev, invoiceNumber: nextInvoiceNumber }));
          } else {
            console.error("Invalid invoice number format");
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
      } else if (showPurchaseModal){
        setShowPurchaseModal(false); 
      } else {
        navigate(-1); 
      }
    };
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
      const processedValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;
  
      if(name === "billFrom" && value === "Cash"){
        setFormData((prev) => ({ ...prev, supplierName: "Cash", address: "", mobileNumber: "" }));
      }
  
      if(name === "billFrom" && value === "Supplier"){
        setFormData((prev) => ({ ...prev, supplierName: "", address: "", mobileNumber: "" }));
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
          const data = await updatePurchaseInvoice(formData);
          if (data.success) { 
            toast.success(`data.message`)
            setShowPurchaseModal(false);
          } else {
            toast.error(data.message || "Update invoice failed");
          }
        } else {
          const data = await createNewPurchaseInvoice(formData);
          if (data.success) { 
            toast.success(` ${data.message}`)
            setShowPurchaseModal(false);
          } else {
            toast.error(` ${data.message}` || "Invoice creation failed");
          }
        }
      } catch (error) {
        toast.error(` ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="form-control">
      {showPurchaseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
        <div className="bg-white rounded-lg shadow-md w-[90%] max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header section */}
          <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold mb-4 text-sm">
              {isEditMode ? "Edit Purchase" : "Unsaved Purchase"}
            </h2>
            <button 
              className="hover:bg-red-600 rounded-lg p-2" 
              onClick={() => handleClose()}
            > 
              X 
            </button>
          </div>
          </div>

          {/* Scroll area content */}
          <div className="overflow-y-auto flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
            {/* Invoice Details */}
            <InvoiceDetails formData={formData} handleChange={handleChange} />

            {/* Bill To */}
            <BillFromType formData={formData} setFormData={setFormData} handleChange={handleChange}/>

            {/* Item Details */}
            <ItemDetails formData={formData} setFormData={setFormData} handleChange={handleChange} />

            {/* Show Table */}
            {formData.items && formData.items.length > 0 && (
              <div className="mt-6">
                <InvoiceTable items={formData.items} setFormData={setFormData} />
              </div>
              )}
            
            {/* Total amount etc */}
            <OtherSection formData={formData} setFormData={setFormData} totalItemPrice={totalItemPrice} handleChange={handleChange} />

              {/* Submit Section */}
              <SubmitSection formData={formData} totalItemPrice={totalItemPrice} loading={loading} handleSubmit={handleSubmit} />

            </form>
          </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default CreatePurchaseInvoice