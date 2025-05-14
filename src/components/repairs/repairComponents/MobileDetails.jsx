import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandDropdown from "../../brand/BrandDropdown";
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

        {/* lockOrPassword */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Lock or Password</span>
            </label>
            <input
                type="text"
                name="lockOrPassword"
                className="input input-bordered input-sm text-xs"
                value={formData.lockOrPassword}
                onChange={handleChange}
            />
        </div>

        {/* Email */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Email</span>
            </label>
            <input
                type="email"
                name="email"
                className="input input-bordered input-sm text-xs"
                value={formData.email}
                onChange={handleChange}
            />
        </div>

        {/* anyDamage */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Any Damage</span>
            </label>
            <input
                type="text"
                name="anyDamage"
                className="input input-bordered input-sm text-xs"
                value={formData.anyDamage}
                onChange={handleChange}
            />
        </div>

        {/* otherDetails */}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-xs">Other Details</span>
            </label>
            <input
                type="text"
                name="otherDetails"
                className="input input-bordered input-sm text-xs"
                value={formData.otherDetails}
                onChange={handleChange}
            />
        </div>     
    </>
  );
};

export default MobileDetails;