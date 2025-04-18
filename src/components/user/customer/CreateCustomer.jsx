import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  HomeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CreditCardIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckBadgeIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { createCustomer } from "../../../../service/customerApi";

const CreateCustomer = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    address: "",
    city: undefined,
    state: undefined,
    pinCode: undefined,
    country: undefined,
    email: undefined,
    contactNumber: undefined,
    mobileNumber: "",
    panNo: "",
    gstin: "",
    gstType: "Unregistered",
    tradeName: "",
    accountType: "Debit",
    openingBalance: 0,
    documentType: "",
    documentNo: "",
    gender: undefined,
    refferedBy: "",
    dateOfBirth: undefined,
    marrigeAniversary: undefined,
    creditAllowed: "No",
    creditLimit: 0,
    remark: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const data = await createCustomer(formData);
      
      if (data.success) {
        setSuccessMessage(data.message)
        // navigate("/sales/invoice/create");
      } else {
        setErrorMessage(data.message || "Customer creation failed")
      }

    } catch (error) {
     console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full max-w-4xl bg-base-100 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <UserIcon className="h-6 w-6" />
          Customer Information
        </h2>
        
        {/* Alerts */}
        {errorMessage && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-1">
                  <UserIcon className="h-4 w-4" /> Full Name *
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-1">
                  <HomeIcon className="h-4 w-4" /> Address *
                </span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-1">
                  <PhoneIcon className="h-4 w-4" /> Mobile Number *
                </span>
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            className="btn btn-outline btn-block mt-4"
            onClick={() => setShowMoreFields(!showMoreFields)}
          >
            {showMoreFields ? "Hide Additional Fields" : "Show More Fields"}
          </button>

          {/* Optional Fields */}
          {showMoreFields && (
            <div className="space-y-6 mt-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <BuildingOfficeIcon className="h-4 w-4" /> City
                    </span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" /> State
                    </span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" /> Pin Code
                    </span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" /> Country
                    </span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <EnvelopeIcon className="h-4 w-4" /> Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <UserIcon className="h-4 w-4" /> Referred By
                    </span>
                  </label>
                  <input
                    type="text"
                    name="refferedBy"
                    value={formData.refferedBy}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-1">
                      <UserIcon className="h-4 w-4" /> Gender
                    </span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Tax Details */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
                  <IdentificationIcon className="h-4 w-4" /> Tax Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">PAN No</span>
                    </label>
                    <input
                      type="text"
                      name="panNo"
                      value={formData.panNo}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">GSTIN</span>
                    </label>
                    <input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">GST Type</span>
                    </label>
                    <select
                      name="gstType"
                      value={formData.gstType}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                    >
                      <option value="Unregistered">Unregistered</option>
                      <option value="Registered">Registered</option>
                      <option value="Composition">Composition</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Trade Name</span>
                    </label>
                    <input
                      type="text"
                      name="tradeName"
                      value={formData.tradeName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
                  <CreditCardIcon className="h-4 w-4" /> Account Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Account Type</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="accountType"
                          value="Debit"
                          checked={formData.accountType === "Debit"}
                          onChange={handleChange}
                          className="radio radio-primary"
                        />
                        <span className="label-text">Debit</span>
                      </label>
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="accountType"
                          value="Credit"
                          checked={formData.accountType === "Credit"}
                          onChange={handleChange}
                          className="radio radio-primary"
                        />
                        <span className="label-text">Credit</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Opening Balance</span>
                    </label>
                    <label className="input-group">
                      <span className="bg-base-300">
                        <CurrencyDollarIcon className="h-4 w-4" />
                      </span>
                      <input
                        type="number"
                        name="openingBalance"
                        value={formData.openingBalance}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Identity Details */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
                  <DocumentTextIcon className="h-4 w-4" /> Identity Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Document Type</span>
                    </label>
                    <input
                      type="text"
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Document Number</span>
                    </label>
                    <input
                      type="text"
                      name="documentNo"
                      value={formData.documentNo}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Important Dates
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Anniversary</span>
                    </label>
                    <input
                      type="date"
                      name="marrigeAniversary"
                      value={formData.marrigeAniversary}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Other Details */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
                  <InformationCircleIcon className="h-4 w-4" /> Other Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Credit Allowed</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="creditAllowed"
                          value="Yes"
                          checked={formData.creditAllowed === "Yes"}
                          onChange={handleChange}
                          className="radio radio-primary"
                        />
                        <span className="label-text">Yes</span>
                      </label>
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="radio"
                          name="creditAllowed"
                          value="No"
                          checked={formData.creditAllowed === "No"}
                          onChange={handleChange}
                          className="radio radio-primary"
                        />
                        <span className="label-text">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Credit Limit</span>
                    </label>
                    <label className="input-group">
                      <span className="bg-base-300">
                        <CurrencyDollarIcon className="h-4 w-4" />
                      </span>
                      <input
                        type="number"
                        name="creditLimit"
                        value={formData.creditLimit}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                      />
                    </label>
                  </div>

                  <div className="form-control col-span-1 md:col-span-2">
                    <label className="label">
                      <span className="label-text">Remark</span>
                    </label>
                    <textarea
                      name="remark"
                      value={formData.remark}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  <CheckBadgeIcon className="h-5 w-5" />
                  Create Customer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;