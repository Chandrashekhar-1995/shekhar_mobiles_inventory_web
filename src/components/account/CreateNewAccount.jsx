import { useState } from "react";
import { toast } from "react-toastify";
import { createAccount } from "../../../service/accountApi";
import Bankdetails from "./Bankdetails";


const CreateNewAccount = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    accountName: "",
    accountType: "cash",
    accountNumber: "",
    ifscCode: "",
    branch:"",
    openingBalance:"",
    isActive:true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.accountName || !formData.accountType) {
        toast.error("Please fill all required fields");
        return;
      }

      const data = await createAccount(formData);

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        resetForm()
        navigate("/account")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  };

  const resetForm = () => {
    setFormData({
      accountName: "",
    accountType: "cash",
    accountNumber: "",
    ifscCode: "",
    branch:"",
    balance:"",
    createdBy:"",
    isActive:true,
    });
  };

  return (
    <div className="form-control">
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create New Account
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Create New Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Problem Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Account Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">Account Name</span>
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    className="input input-bordered input-sm text-xs"
                    placeholder="e.g., Phone Pay"
                  />
                </div>

                {/* Account Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">Account Type *</span>
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="select select-bordered select-sm"
                    required
                  >
                    <option value="cash">Cash</option>
                    <option value="qr_code">QR Code</option>
                    <option value="razorpay">Bill of Supply</option>
                    <option value="bank">Bank</option>
                  </select>
                </div>

                { formData.accountType==="bank" && (
                  <Bankdetails formData={formData} handleChange={handleChange}/>
                )};

                {/* is Active */}
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text text-xs">Active</span>
                  </label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        isActive: e.target.checked
                        }))
                    }}
                    className="toggle toggle-primary"
                  />
                </div>

              </div>


              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewAccount;