import React from "react";
import CustomerDetails from "./CustomerDetails";
import { useNavigate } from "react-router-dom";

const BillToType = ({ formData, setFormData, handleChange }) => {
  const navigate = useNavigate();

  const handleCreateCustomer = (e) =>{
    e.preventDefault();
    navigate("/user/customer/create")
  }
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-xs">Bill To</span>
        </label>
        
        <div>
          <label className="mr-4">
            <input
              type="radio"
              value="Cash"
              name="billTo"
              className="mx-2"
              checked={formData.billTo === "Cash"}
              onChange={handleChange}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              value="Customer"
              name="billTo"
              checked={formData.billTo === "Customer"}
              onChange={handleChange}
            />
            Customer
          </label>

          {formData.billTo === "Customer" && (
            <button 
            className="bg-primary text-white font-bold px-2" 
            onClick={handleCreateCustomer}
            >
              +
            </button>
          )}
        </div>
      </div>

          { formData.billTo === "Customer" &&
            <CustomerDetails
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          }


{/* Ek inpute placeOfSupply */}
      
    </div>
  );
};

export default BillToType;
