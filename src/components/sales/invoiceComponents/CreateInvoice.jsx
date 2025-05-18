import React, { useEffect, useState } from "react";
import { createNewInvoice, lastInvoice, updateInvoice } from "../../../../service/invoiceApi";
import InvoiceDetails from "./InvoiceDetails";
import ItemDetails from "./ItemDetails";
import BillToType from "./BillToType";
import InvoiceTable from "./InvoiceTable";
import OtherSection from "./OtherSection";
import SubmitSection from "./SubmitSection";
import { toast } from "react-toastify";
import useScreenSize from "../../../hooks/useScreenSize";

const CreateInvoice = ({ isEditMode = false, showInvoiceModal, setShowInvoiceModal, onClose, open }) => {
  const { isMobile } = useScreenSize();
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
  
  useEffect(() => {
    if(open) {
      setShowInvoiceModal(true);
    }
  }, [open, setShowInvoiceModal]);

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
    } else if (setShowInvoiceModal) {
      setShowInvoiceModal(false);
    } else {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? (value === "" ? 0 : Number(value)) : value;

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
          setShowInvoiceModal(false);
        } else {
          toast.error(`❌ ${data.message}` || "Update invoice failed");
        }
      } else {
        const data = await createNewInvoice(formData);
        if (data.success) { 
          toast.success(`✅ ${data.message}`)
          setShowInvoiceModal(false);
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
    <div>
      {showInvoiceModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
          <div
            className={`
              bg-white rounded-lg shadow-md 
              w-[90%] ${isMobile ? "h-full" : "max-h-[90vh]"} 
              ${isMobile ? "pt-4 pb-0" : "pt-6"} 
              flex flex-col
            `}
          >
            {/* Header */}
            <div className={`p-4 border-b sticky top-0 bg-white z-10 ${isMobile ? "text-center" : ""}`}>
              <div className={`flex ${isMobile ? "flex-col items-center" : "items-center justify-between"}`}>
                <h2 className="font-semibold text-lg mb-2">{isEditMode ? "Edit Invoice" : "New Invoice"}</h2>
                <button className="p-2 hover:bg-red-100 rounded" onClick={handleClose}>✕</button>
              </div>
            </div>

            {/* Content */}
            <div className={`overflow-y-auto flex-1 p-4 ${isMobile ? "px-2" : "px-6"}`}>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Top Sections: InvoiceDetails + BillToType */}
                <div className={isMobile ? "flex flex-col space-y-4" : "grid grid-cols-2 gap-6"}>
                  <InvoiceDetails formData={formData} handleChange={handleChange} />
                  <BillToType formData={formData} setFormData={setFormData} handleChange={handleChange} />
                </div>

                {/* Item Entry */}
                <ItemDetails formData={formData} setFormData={setFormData} handleChange={handleChange} />

                {/* Table of Added Items */}
                {formData.items.length > 0 && (
                  <div className="mt-4 overflow-x-auto">
                    <InvoiceTable items={formData.items} setFormData={setFormData} />
                  </div>
                )}

                {/* Other Charges / Notes */}
                <OtherSection
                  formData={formData}
                  setFormData={setFormData}
                  totalItemPrice={totalItemPrice}
                  handleChange={handleChange}
                />

                {/* Submit / Summary */}
                <div className={`
                  ${isMobile
                    ? "sticky bottom-0 bg-white p-4 border-t"
                    : "sticky bottom-0 bg-white p-4 border-t"
                  }
                `}>
                  <SubmitSection
                    formData={formData}
                    totalItemPrice={totalItemPrice}
                    loading={loading}
                    handleSubmit={handleSubmit}
                  />
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;