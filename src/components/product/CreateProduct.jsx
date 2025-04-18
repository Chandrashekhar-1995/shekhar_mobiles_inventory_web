import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../service/productApi";
import useFetchCategories from "../../hooks/useFetchCategories";
import useFetchBrands from "../../hooks/useFetchBrands";
import RequiredFields from "./productComponents/RequiredFields";
import OptionalFields from "./productComponents/OptionalFields";
import OtherDetails from "./productComponents/OtherDetails";

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
     const [showMoreFields, setShowMoreFields] = useState(false);
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      productName: "",
      itemCode: "",
      brand: "",
      category: "",
      subcategory: "",
      purchasePrice:"",
      salePrice: "",
      minSalePrice: "",
      mrp: "",
      openingStock: "",
      unit: "PCS", 
      hsnCode: "", // write input field after
      saleDiscount: "",
      lowLevelLimit: "",
      serialNumber: "",
      productImage: "", // write input field after
      description: "",
      warranty: "",
      location: "",
      printDescription: false,
      oneClickSale: false,
      enableTracking: false,
      printSerialNo: false,
      notForSale: false,
    });

    useFetchCategories();
    useFetchBrands();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const data = await createProduct(formData);
        if (data.success) { 
          alert(`✅ ${data.message}`)
          // navigate(`/update/${data._id}`) // navigate update page for fix anythings
        } else {
          alert(`❌ ${data.message}` || "Product creation failed");
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
            Product Information
          </h2>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required Fields */}
              <RequiredFields  formData={formData}  setFormData={setFormData}  handleChange={handleChange}
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
              <div className="space-y-6 mt-6">
                <OptionalFields formData={formData} handleChange={handleChange} />
                <OtherDetails formData={formData} handleChange={handleChange} />
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
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CreateProduct;