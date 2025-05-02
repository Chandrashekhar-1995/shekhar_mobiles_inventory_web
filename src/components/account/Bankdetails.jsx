import React from "react";

const Bankdetails = ({formData, handleChange}) => {
  return (
    <>
        {/* Account Number */}
        <div className="form-control">
            <label className="label">
                <span className="label-text text-xs">Account Number</span>
            </label>
            <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="input input-bordered input-sm text-xs"
                placeholder="account number"
            />
        </div>

        {/* IFSC Code */}
        <div className="form-control">
            <label className="label">
                <span className="label-text text-xs">IFSC Code </span>
            </label>
            <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="input input-bordered input-sm text-xs"
                placeholder="account number"
            />
        </div>

        {/* Branch */}
        <div className="form-control">
            <label className="label">
                <span className="label-text text-xs">Branch </span>
            </label>
            <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="input input-bordered input-sm text-xs"
                placeholder="branch name"
            />
        </div>
    </>
  )
}

export default Bankdetails;