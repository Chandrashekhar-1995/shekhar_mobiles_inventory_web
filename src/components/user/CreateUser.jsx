import React, { useState } from "react";
import { createUser } from "../../../service/userApi";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import RequiredFields from "./customer/RequiredFields";

const CreateUser = () => {
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
    emergencyContactPerson:"",
    emergencyContactNumber:"",
    bloodGroup:"",
    joiningDate: "",
    identityDocument:undefined,
    documentNumber:undefined,
    communication:"email",
    salesCommission:false,
    gstin: "",
    gstType: "Unregistered",
    tradeName: "",
    accountType: "Debit",
    openingBalance: 0,
    documentType: "",
    documentNo: "",
    gender: undefined,
    designation:"",
    department:"",
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
      const data = await createUser(formData);
      
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
        Create New Staff
      </button>

      {showModal && (
        <div className="flex items-center justify-center mb-8 pt-4 m-2 bg-gray-100 border border-black ">
        <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold mb-4 text-sm">Staff details</h2>
            <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => setShowModal(false)}
            > X </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
            {/* Required Fields */}
            <RequiredFields  formData={formData} handleChange={handleChange}
              />

            
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
                      Create Staff
                    </>
                  )}
                </button>
              </div>
          </form>

          </div>
        </div>
      )}
      
    </div>
  )
}

export default CreateUser