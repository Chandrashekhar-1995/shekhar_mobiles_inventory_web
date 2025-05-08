import React, { useState } from "react";
import { createProduct } from "../../../service/productApi";
import RequiredFields from "./productComponents/RequiredFields";
import OptionalFields from "./productComponents/OptionalFields";
import OtherDetails from "./productComponents/OtherDetails";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProduct = ({ isEditMode = false, onClose }) => {
    const [showModal, setShowModal] = useState(false);
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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleClose = () => {
      if(onClose) {
        onClose();
      } else if(showModal==true){
        setShowModal(false)
      } else {
        navigate(-1); 
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const data = await createProduct(formData);
        if (data.success) { 
          toast.success(data.message)
          navigate(-1)  // manage inventory par click karna hai 
        } else {
          toast.error(`❌ ${data.message}` || "Product creation failed");
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
        Create New Product
      </button>

     {/* Modal */}
     {showModal && (
      <div className="flex items-center justify-center mb-8 pt-4 bg-gray-100 ">
        <div className="bg-white mb-8 rounded-lg shadow-md w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto ">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold mb-4 text-sm">Product Details</h2>
            <button className="hover:bg-red-600 rounded-lg p-2"  onClick={handleClose}
              > X </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100">
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
     )}

      </div>
    );
};

export default CreateProduct;