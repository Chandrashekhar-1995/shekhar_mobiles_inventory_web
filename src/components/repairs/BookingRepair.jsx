import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchUsers from "../../hooks/useFetchUsers"
import { createNewRepair, lastRepair } from "../../../service/repairApi";
import RepairInvoiceDetails from "./repairComponents/RepairInvoiceDetails";
import BillToType from "../sales/invoiceComponents/BillToType";
import RepairType from "./repairComponents/RepairType";
import RepairTable from "./repairComponents/RepairTable";
import SubmitSection from "./repairComponents/SubmitSection";
import PaymentDetails from "../sales/invoiceComponents/PaymentDetails";
import NotesSection from "./repairComponents/NotesSection";
import Refrances from "./repairComponents/Refrances";

const BookingRepair = ({ isEditMode = false, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
          repairNumber: "REP-0001",
          bookingDate: "",
          expectDeliveryDate:"",
          billTo: "Cash",
          customerId: "",
          customerName: "Cash",
          mobileNumber: "",
          address: "",
          repairing:[],
          type:"mobile",
          mobile:"",
          brand:"",
          brandName:"",
          modelNo:"",
          emeiNumber:"",
          emeiNumberSecond:"",
          lockOrPassword:"",
          email: "",
          anyDamage: "",
          otherDetails: "",
          repairDescription:"",
          problem: "",
          sinceLong: "",
          repairPrice:"",
          expectedRepairingDate:"",
          expectedRepairingTime:"",
          repairItem: "",
          totalAmount: "",
          discountAmount: "",
          advanceAmount: "",
          paymentDate: "",
          paymentMode: "Cash",
          privateNote: "",
          customerNote: "",
          bookBy: "",
          deliveryTerm: "",
          discount: "",
          transactionId:"",
          srNumber: "",
        });
  
  useFetchCustomers();
  useFetchProducts();
  useFetchUsers();
  
  const navigate = useNavigate();

  // fetch last invoice
  useEffect(() => {
    const fetchLastRepair = async () =>{
      try {
        const data = await lastRepair();
        if (data.success) { 
          const lastRepairNumber = data.data.repairNumber;
          const match = lastRepairNumber.match(/^([A-Za-z-]+)(\d+)$/);

          if (match) {
            const prefix = match[1];
            const numericPart = match[2];
            const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, '0');
            const nextRepairNumber = `${prefix}${nextNumber}`;
            setFormData((prev) => ({ ...prev, repairNumber: nextRepairNumber }));
            
          } else {
            console.error('Invalid repair number format');
          }
        } 
      } catch (error) {
        console.error("Error fetching the last repair:", error);
      }
    };

    fetchLastRepair();
  }, []);

  // date set today
useEffect(() => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  
  // Calculate tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];
  
  setFormData((prev) => ({ 
    ...prev, 
    bookingDate: todayString, 
    paymentDate: todayString, 
    expectDeliveryDate: tomorrowString,
    expectedRepairingDate:tomorrowString,
  }));
}, []);

    const handleClose = () => {
      if(onClose) {
        onClose();
      } else {
        navigate(-1); 
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
  
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

    
    const totalItemPrice = formData.repairing.reduce((total, item) => total + parseFloat(item.repairPrice || 0), 0);


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const data = await createNewRepair(formData);
        console.log("data",data);
        
        if (data.success) {
          alert(`✅ ${data.message}`)
          navigate("/repair")
        } else {
          alert(`❌ ${data.message}` || "Repair creation failed");
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
          <h2 className="font-semibold mb-4 text-sm">{isEditMode ? "Edit Repair" : "Booking Repair"}</h2>
          <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => handleClose()}
          > X </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
          {/* Repair Invoice Details */}
          <RepairInvoiceDetails formData={formData} handleChange={handleChange} />

          {/* Bill To */}
          <BillToType
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          />

          {/* Repair Type */}
          <RepairType formData={formData} setFormData={setFormData} handleChange={handleChange} />

          <RepairTable formData={formData} />

          <PaymentDetails 
          formData={formData}
          setFormData={setFormData} 
          handleChange={handleChange}
          totalItemPrice={totalItemPrice} />

          <NotesSection
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            />

          <Refrances formData={formData}  handleChange={handleChange}  />

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
  )
}

export default BookingRepair;