import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandDropdown from "../../product/productComponents/BrandDropdown";
import ModelNoDropdown from "../../mobile/mobileComponents/ModelNoDropdown";

const MobileDetails = ({ formData, setFormData}) => {

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

        
    </>
  );
};

export default MobileDetails;