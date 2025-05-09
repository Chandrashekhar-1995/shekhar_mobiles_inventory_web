import React, { useEffect, useState } from "react";
import { createUser } from "../../../service/userApi";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import RequiredFields from "./customer/RequiredFields";
import OptionalFields from "./customer/OptionalFields";
import Designation from "./userComponent/Designation";
import ContactAndOthers from "./userComponent/ContactAndOthers";
import TrueFalseOption from "./userComponent/TrueFalseOption";
import MoreDetails from "./userComponent/MoreDetails";

const CreateUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    address: "",
    city:"",
    state: "",
    pinCode: "",
    country: "",
    email: undefined,
    contactNumber: "",
    mobileNumber: "",
    panNo: "",
    emergencyContactPerson:"",
    emergencyContactNumber:"",
    bloodGroup:"",
    joiningDate: "",
    documentType:undefined,
    documentNumber:undefined,
    communication:"email",
    salesCommission:false,
    gstin: "",
    gstType: "Unregistered",
    tradeName: "",
    accountType: "Credit",
    openingBalance: 0,
    documentType: "",
    documentNo: "",
    gender: "male",
    designation:"",
    department:"",
    refferedBy: "",
    dateOfBirth: undefined,
    marrigeAniversary: undefined,
    creditAllowed: false,
    creditLimit: 0,
    remark: "",
    bio: "",
  });

  // date set today
    useEffect(() => {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({ ...prev, joiningDate: today}));
    }, []);

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
            <Designation formData={formData} handleChange={handleChange}
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

              <ContactAndOthers formData={formData} handleChange={handleChange} />

              <MoreDetails formData={formData} handleChange={handleChange} />

              <TrueFalseOption formData={formData} handleChange={handleChange} />


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