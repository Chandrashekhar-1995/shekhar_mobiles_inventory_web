import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandDropdown from "../../product/productComponents/BrandDropdown";
import ModelNoDropdown from "../../mobile/mobileComponents/ModelNoDropdown";

const MobileDetails = ({ formData, setFormData, handleChange}) => {

  const navigate = useNavigate();

  const handleSelect = (mobile) => {
      setFormData({
        ...formData,
        mobile: mobile._id,
        brandName: mobile.brandName,
        modelNumber: mobile.modelNumber,
      });
      setQueryModelNo(mobile.modelNo);
      setQueryBrandName(mobile.brandName);
    };
  
  const handleCreateMobile = (e) =>{
    e.preventDefault()
    navigate("/mobile/create")
  }

  return (
    <>
        {/* Brand Name */}
        <BrandDropdown formData={formData} setFormData={setFormData} />
        <ModelNoDropdown formData={formData} setFormData={setFormData} />

        {/* EMEI No 1 */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">EMEI No</span>
            </label>
            <input
                type="text"
                name="emeiNumber"
                className="input input-bordered input-sm text-xs"
                value={formData.emeiNumber}
                onChange={handleChange}
            />
        </div>

        {/* EMEI No 2 */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">EMEI No 2</span>
            </label>
            <input
                type="text"
                name="emeiNumberSecond"
                className="input input-bordered input-sm text-xs"
                value={formData.emeiNumberSecond}
                onChange={handleChange}
            />
        </div>

        
    </>
  );
};

export default MobileDetails;