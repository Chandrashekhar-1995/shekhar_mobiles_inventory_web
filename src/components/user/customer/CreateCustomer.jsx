import React, { useState } from "react";
import { createCustomer } from "../../../../service/customerApi";
import RequiredFields from "./RequiredFields.jsx";
import OptionalFields from "./OptionalFields.jsx";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const CreateCustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMoreFields, setShowMoreFields] = useState(false);

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
    try {
      const data = await createCustomer(formData);
      
      if (data.success) {
        toast.success(data.message)
        setShowModal(false);
      } else {
        toast.error(data.message)
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Customer
      </button>

      {showModal && (
        <div className="flex items-center justify-center mb-8 pt-4 m-2 bg-gray-100 border border-black ">
          <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold mb-4 text-sm">Customer details</h2>
              <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => setShowModal(false)}
              > X </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
              {/* Required Fields */}
              <RequiredFields  formData={formData} handleChange={handleChange}
              />

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
                <>
                <OptionalFields formData={formData} handleChange={handleChange} />

              {/* Optional Fields */}
              <div className="card bg-base-200 p-4 relative">
                <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold">Other Details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <sapn className="label-text">Credit Allowed</sapn>
                      <input
                        type="checkbox"
                        name="creditAllowed"
                        checked={formData.creditAllowed}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            creditAllowed: e.target.checked
                          }))
                        }}
                        className="toggle toggle-primary"
                        />
                    </label>
                  </div>
                        
                  <div className="form-control">
                    <label className="label">
                    <span className="label-text text-xs">Credit Limit</span>
                    </label>
                    <input
                      type="text"
                      name="creditLimit"
                      value={formData.creditLimit}
                      onChange={handleChange}
                       className="input input-bordered input-sm text-xs w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xs">Remark</span>
                      <textarea
                        type="textarea"
                        name="remark"
                        value={formData.remark}
                        onChange={handleChange}
                         className="textarea textarea-bordered input-sm text-xs w-full"
                      />
                    </label>
                  </div>
                </div>
              </div>

              </>
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
      )}
    </div>

  );
};

export default CreateCustomer;



    //           {/* Important Dates */}
    //           <div className="card bg-base-200 p-4 relative">
    //             <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
    //               <CalendarIcon className="h-4 w-4" /> Important Dates
    //             </div>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    //               <div className="form-control">
    //                 <label className="label">
    //                   <span className="label-text">Date of Birth</span>
    //                 </label>
    //                 <input
    //                   type="date"
    //                   name="dateOfBirth"
    //                   value={formData.dateOfBirth}
    //                   onChange={handleChange}
    //                   className="input input-bordered w-full"
    //                 />
    //               </div>

    //               <div className="form-control">
    //                 <label className="label">
    //                   <span className="label-text">Anniversary</span>
    //                 </label>
    //                 <input
    //                   type="date"
    //                   name="marrigeAniversary"
    //                   value={formData.marrigeAniversary}
    //                   onChange={handleChange}
    //                   className="input input-bordered w-full"
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           {/* Other Details */}
    //           <div className="card bg-base-200 p-4 relative">
    //             <div className="absolute -top-3 left-4 bg-base-200 px-2 font-semibold flex items-center gap-1">
    //               <InformationCircleIcon className="h-4 w-4" /> Other Details
    //             </div>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
    

    //             </div>
    //           </div>
    //         </div>
    //       )}

          
        // </form>
    //   </div>
    // </div>
