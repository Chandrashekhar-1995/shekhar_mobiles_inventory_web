import React, { useState } from "react";
import { createMobile } from "../../../service/mobileApi";
import BrandDropdown from "../brand/BrandDropdown";
import MobileFields from "./mobileComponents/MobileFields";
import ModelNoDropdown from "./mobileComponents/ModelNoDropdown";
import { toast } from "react-toastify";


const CreateMobile = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      mobileType: "repair",
      brand: "",
      brandName: "",
      modelNo:"",
      emeiNumber: "",
      emeiNumberSecond:"",
      productImage: "",
      purchasePrice: "",
      salePrice: "",
      minSalePrice: "",
      mrp: "",
      openingStock: "",
      description : "",
      warranty : "",
      unit: "PCS",
      printDescription: false,
      enableTracking: false,
      printEmeiNo: false,
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleClose = () => {
      if(showModal===true){
        setShowModal(false)
      } else {
        navigate(-1); 
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const data = await createMobile(formData);
        if (data.success) { 
          toast.success(` ${data.message}`)
          setShowModal(false);
        } else {
          alert(` ${data.message}` || "Mobile creation failed");
        }
      } catch (error) {
       console.error(error)
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
        Create New Mobile
      </button>

      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
        {/* Scroll in main containt */}
        <div className="bg-white rounded-lg shadow-md w-[90%] max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header section */}
          <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between pt-10">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gray-100 rounded-l-lg">
            Mobile Information
          </h2>
          <button className="hover:bg-red-600 rounded-lg p-2"  onClick={() => handleClose()}
          > X </button>
          </div>
          </div>

          {/* Scroll area content */}
          <div className="overflow-y-auto flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BrandDropdown formData={formData} setFormData={setFormData} />

              {/* Mobile Type */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs">Mobile Type</span>
                </label>
                <select
                  id="mobileType"
                  name="mobileType"
                  className="input input-bordered input-sm text-xs w-full"
                  value={formData.mobileType}
                  onChange={handleChange}
                  >
                  <option value="new" >New</option>
                  <option value="second_hand">Second Hand</option>
                  <option value="repair">Repair</option>
                </select>
              </div>

              <ModelNoDropdown formData={formData} setFormData={setFormData} />

              {/* EMEI 1 */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs">EMEI Number</span>
                </label>
                <input
                  type="text"
                  name="emeiNumber"
                  className="input input-bordered input-sm text-xs w-full"
                  value={formData.emeiNumber}
                  onChange={handleChange}
                />

              </div>

              {/* EMEI 2 */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-xs">EMEI Number 2</span>
                </label>
                <input
                  type="text"
                  name="emeiNumberSecond"
                  className="input input-bordered input-sm text-xs w-full"
                  value={formData.emeiNumberSecond}
                  onChange={handleChange}
                />

              </div>


              {formData.mobileType !== "repair" && <MobileFields  formData={formData}  setFormData={setFormData}  handleChange={handleChange}
              />}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    Create Mobile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        </div>
      </div>
      )}

      </div>
    );
};

export default CreateMobile;