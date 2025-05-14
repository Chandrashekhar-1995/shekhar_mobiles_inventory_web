import React, { useState } from "react";
import { createBrand } from "../../../service/brandApi";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const [showModal, setShowModal] = useState(false);
  const [brandName, setBrandName] = useState("");

  const addBrand = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      toast.error("Brand name cannot be empty");
      return;
    }
    try {
      const data = await createBrand({brandName});
      if (data.success) {
        toast.success(data.message);
        setBrandName("");
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating brand. Please try again.");  
    } 
  };

  const cancelCreate = () => {
    setBrandName("");
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setShowModal(true)}
      >
        Create Brand
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold">Create new brand</h2>
            
            {/* Added input field */}
            <div className="form-control w-full">
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
                className="input input-bordered input-sm w-full"
                autoFocus
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-success btn-sm"
                onClick={addBrand}
              >
                Create
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={cancelCreate}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateBrand;