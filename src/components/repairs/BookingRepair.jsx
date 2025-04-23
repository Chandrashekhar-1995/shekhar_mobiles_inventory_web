import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchUsers from "../../hooks/useFetchUsers"
import { createNewRepair, lastRepair } from "../../../service/repairApi";
import InvoiceDetails from "../sales/invoiceComponents/InvoiceDetails";
import RepairInvoiceDetails from "./repairComponents/RepairInvoiceDetails";
import BillToType from "../sales/invoiceComponents/BillToType";
import RepairType from "./repairComponents/RepairType";

const BookingRepair = ({ isEditMode = false, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
          invoiceType: "",
          repairNumber: "REP-0001",
          bookingDate: "",
          expectRepairingTime: [],
          date:"",
          time:"",
          deliveryDate:"",
          placeOfSupply: "",
          billTo: "Cash",
          customerId: "",
          customerName: "Cash",
          mobileNumber: "",
          address: "",
          repairing:[],
          type:"",
          mobile:[],
          brandName:"",
          modelNumber:"",
          emeiNumber:"",
          lockOrPassword:"",
          email: "",
          anyDamage: "",
          otherDetails: "",
          fault: [],
          problem: "",
          sinceLong: "",
          repairStatus: "",
          repairItem: "",
          usedItems: [],
          item: "",
          productName: "",
          itemCode: "",
          unit: "",
          quantity: "",
          mrp: "",
          salePrice: "",
          total: "",
          itemDescription: "",
          expectRepairingAmount: "",
          totalAmount: "",
          discountAmount: "",
          advanceAmount: "",
          totalPayableAmount: "",
          paymentDate: "",
          paymentMode: "Cash",
          privateNote: "",
          customerNote: "",
          receivedAmount: "",
          dueAmount: "",
          status: "",
          bookBy: "",
          repairStatus: "booked",
          repairUnder: "",
          repairBy: "",
          deliverBy: "",
          deliveryTerm: "",



          discount: "",
          transactionId:"",
          status: "Unpaid",
          deliveryTerm: "",
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
        console.log(data);
        
        if (data.success) { 
          const lastRepairNumber = data.data.lastRepair.repairNumber;
          const match = lastRepairNumber.match(/^([A-Za-z-]+)(\d+)$/);

          if (match) {
            const prefix = match[1];
            const numericPart = match[2];
            const nextNumber = (parseInt(numericPart, 10) + 1).toString().padStart(numericPart.length, '0');
            const nextRepairNumber = `${prefix}${nextNumber}`;
            setFormData((prev) => ({ ...prev, invoiceNumber: nextRepairNumber }));
            console.log("repair no", lastRepairNumber);
            
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
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, bookingDate: today, paymentDate: today }));
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        console.log("Form Data",formData);
        
        // const data = await createNewRepair(formData);
        // console.log("data",data);
        
        // if (data.success) {
        //   alert(`✅ ${data.message}`)
        //   navigate("/repair")
        // } else {
        //   alert(`❌ ${data.message}` || "Repair creation failed");
        // }
        
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
          <RepairType formData={formData} handleChange={handleChange} />

        </form>
      </div>
    </div>
  )
}

export default BookingRepair;