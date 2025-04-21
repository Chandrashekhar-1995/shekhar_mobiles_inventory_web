import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { createNewInvoice, lastInvoice, updateInvoice } from "../../../service/invoiceApi";
import InvoiceDetails from "./invoiceComponents/InvoiceDetails";
import ItemDetails from "./invoiceComponents/ItemDetails";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import BillToType from "./invoiceComponents/BillToType";
import useFetchProducts from "../../hooks/useFetchProducts";
import InvoiceTable from "./invoiceComponents/InvoiceTable";
import OtherSection from "./invoiceComponents/OtherSection";
import useFetchUsers from "../../hooks/useFetchUsers";

const CreateInvoice = ({ isEditMode = false, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
        invoiceType: "Non GST",
        invoiceNumber: "",
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
        quantity: "",
        salePrice: "",
        mrp: "",
        discount: "",
        total: "",
        itemDescription: "",
        unitPrice: "",
        netPrice: "",
        items: [],
        totalAmount: "",
        discountAmount: "",
        totalPayableAmount: "",
        paymentDate: "",
        paymentMode: "Cash",
        privateNote: "",
        customerNote: "",
        receivedAmount: "",
        transactionId:"",
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
    const fetchLastInvoice = async () =>{
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
  
  const navigate = useNavigate();
  
  const handleClose = () => {
    if(onClose) {
      onClose();
    } else {
      navigate(-1); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "salePrice" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    if(name==="billTo" && value==="Cash"){
      setFormData((prev) => ({ ...prev, customerName: "Cash", address:"", mobileNumber:"" }));
    }

    if(name==="billTo" && value==="Customer"){
      setFormData((prev) => ({ ...prev, customerName: "", address:"", mobileNumber:"" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(isEditMode){
        const data = await updateInvoice(formData);
        
        if (data.success) { 
          alert(`✅ ${data.message}`)
        } else {
          alert(`❌ ${data.message}` || "Update invoice failed");
        }

      } else {
        const data = await createNewInvoice(formData);
        console.log(data);
        
        if (data.success) { 
          alert(`✅ ${data.message}`)
          isEditMode = true  
        } else {
          alert(`❌ ${data.message}` || "Invoice creation failed");
        }
      }

    } catch (error) {
     console.error(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100 ">
      <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">{isEditMode ? "Edit Invoice" : "Unsaved Invoice"}</h2>
          <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => handleClose()}
          > X </button>
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
          <InvoiceTable
          formData={formData}
          />

          {/* Total amount etc */}
          <OtherSection
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          />

        </form>
      </div>
    </div>
  )
};

export default CreateInvoice