import React, { useState } from "react";
import { createMobile } from "../../../service/mobileApi";
import useFetchBrands from "../../hooks/useFetchBrands";
import BrandDropdown from "../product/productComponents/BrandDropdown";
import MobileFields from "./mobileComponents/MobileFields";
import ModelNoDropdown from "./mobileComponents/ModelNoDropdown";


const CreateMobile = () => {
    const [loading, setLoading] = useState(false);
  
    const [formData, setFormData] = useState({
      mobileType: "repair",
      brand: "",
      brandName: "",
      modelNo: "",
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
      warranty: "",
      printDescription: false,
      enableTracking: false,
      printEmeiNo: false,
    });

    useFetchBrands();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const data = await createMobile(formData);
        if (data.success) { 
          alert(`✅ ${data.message}`)
        } else {
          alert(`❌ ${data.message}` || "Mobile creation failed");
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
          <h2 className="text-2xl font-bold text-center mb-6 bg-gray-100 rounded-l-lg">
            Mobile Information
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BrandDropdown formData={formData} setFormData={setFormData} />

              {/* Mobile Type */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Mobile Type</span>
                </label>
                <select
                  id="mobileType"
                  name="mobileType"
                  className="input input-bordered w-full"
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
                  <span className="label-text">EMEI Number</span>
                </label>
                <input
                  type="text"
                  name="emeiNumber"
                  className="input input-bordered w-full"
                  value={formData.emeiNumber}
                  onChange={handleChange}
                />

              </div>

              {/* EMEI 1 */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">EMEI Number 2</span>
                </label>
                <input
                  type="text"
                  name="emeiNumberSecond"
                  className="input input-bordered w-full"
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
                    Create Mobile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CreateMobile;