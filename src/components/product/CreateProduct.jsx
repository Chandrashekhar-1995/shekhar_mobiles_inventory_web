import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert,} from '@mui/material';
import useCategory from "../../hooks/useCategory";
import useBrand from "../../hooks/useBrand";
import BrandInput from "./brand/BrandInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CreateProduct = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);
  useCategory();
  useBrand();

  const [formData, setFormData] = useState({
    productName:"",             // required
    itemCode:"",                // optional
    brand:"",                   // required
    category:"",                // required
    subcategory:"",             // optional
    purchasePrice:"",           // required
    salePrice:"",               // required
    minSalePrice:"",            // optional
    mrp:"",                     // optional
    openingStock:"0",           // optional
    unit:"PCS",                 // optional
    hsnCode:undefined,          // optional
    gstRate:undefined,          // optional
    saleDiscount:"0",           // optional
    lowLevelLimit:undefined,    // optional
    productImage:undefined,     // optional  not add now update after some time
    description:"",             // optional
    warranty:undefined,         // optional
    location:"",                // optional
    serialNumber:undefined,     // optional
    printDescription:undefined, // optional
    oneClickSale:undefined,     // optional
    enableTracking:undefined,   // optional
    printSerialNo:undefined,    // optional
    notForSale:undefined,       // optional
  });

  const categories = useSelector(store=>store.categories.allCategories);
  const brands = useSelector(store=>store.brands.allBrands);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value });

    if (name === "category") {
      
      //create new category
      if(value === "create-new-category"){
        navigate("/category/create")
      }
      // Find the selected category and update subcategories
      const selectedCategory = categories.find(
        (category) => category.categoryName === value
      );
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      setFormData({ ...formData, category: value, subcategory: "" }); // Reset subcategory
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/product/create",
        formData,
        {
          withCredentials:true
        }
      );
      setSuccessMessage("Product created successfully !");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return categories && brands && (
      <div className="flex items-center justify-center mb-8 bg-gray-100">
        <div className="w-full max-w-sm bg-white mb-8 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Product Information</h2>
          {errorMessage && (
            <Alert severity="error" className="mb-4">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" className="mb-4">
              {successMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Details */}
            <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Product Details
                  </div>
  
                  {/* Category */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Category</label>
                    <select
                      name="category"
                      className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.categoryName}>
                          {category.categoryName}
                        </option>
                      ))}
                      <option value="create-new-category">Create New Category</option>
                    </select>
                  </div>
                  
                  {/* Sub Category */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Sub Category</label>
                    <select
                       name="subcategory"
                       className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                       value={formData.subcategory}
                       onChange={handleChange}
                       required={subcategories.length > 0}
                     >
                       <option value="" disabled>
                         Select Sub Category
                       </option>
                       {subcategories.map((subcategory, index) => (
                         <option key={index} value={subcategory}>
                           {subcategory}
                         </option>
                       ))}
                    </select>
                    
                  </div>           
  
                  {/* Brand */}
                  <BrandInput
                    brands={brands}
                    value={formData.brand}
                    onChange={handleChange}
                  />
  
                  {/* Item Code */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Item Code</label>
                    <input type="text" name="itemCode" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.itemCode} onChange={handleChange} />
                  </div> 

                  {/* Product Name */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Product Name</label>
                    <input type="text" name="productName" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.productName} onChange={handleChange} />
                  </div> 
            </div>

            {/* Price Details */}
            <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Price Details
                  </div>
  
                  {/* Purchase Price */}
                  <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                    <label className="text-xs font-medium p-2">Purchase Price</label>
                    <input type="text" name="purchasePrice" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.purchasePrice} onChange={handleChange} required />
                  </div>
  
                  {/* Sale Price */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Sale Price</label>
                    <input type="text" name="salePrice" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.salePrice} onChange={handleChange} />
                  </div>           
  
                  {/* Min. Sale Price */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Min. Sale Price</label>
                    <input type="text" name="minSalePrice" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.minSalePrice} onChange={handleChange} />
                  </div>
  
                  {/* M.R.P. */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">M.R.P.</label>
                    <input type="text" name="mrp" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.mrp} onChange={handleChange} />
                  </div> 
                </div>
  
            {/* Toggle Button */}
            <Button
              variant="outlined"
              fullWidth
              className="mt-4"
              onClick={() => setShowMoreFields(!showMoreFields)}
            >
              {showMoreFields ? "Hide Additional Fields" : "More Fields"}
            </Button>
  
            {/* Optional Fields */}
            {showMoreFields && (
              <div className="space-y-4">

                {/* Stock and Unit Details */}
                <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                  Stock and Unit Details
                  </div>
  
                  {/* Unit */}
                  <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                    <label className="text-xs font-medium p-2">Unit</label>
                    <input type="text" name="unit" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.unit} onChange={handleChange} />
                  </div>
  
                  {/* Opening Stock */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Opening Stock</label>
                    <input type="text" name="openingStock" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.openingStock} onChange={handleChange} />
                  </div>           

                </div>
  
                {/* Section 3 Others Details */}
                <div className="space-y-4">

                  {/* GST Details */}
                <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    GST Details
                  </div>
  
                  {/* HSN / SAC Code */}
                  <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                    <label className="text-xs font-medium p-2">HSN / SAC Code</label>
                    <input type="text" name="hsnCode" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.hsnCode} onChange={handleChange} />
                  </div>
  
                  {/* GST Rate*/}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">GST Rate</label>
                    <input type="number" name="gstRate" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.gstRate} onChange={handleChange} />
                  </div>   

                </div>
  
                  {/* Other Details */}
                  <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                      Other Details
                  </div>
  
                    {/* Sale Discount */}
                    <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                    <label className="text-xs font-medium p-2"> Sale Discount</label>
                        <input type="text" name="saleDiscount" className="col-span-2 border border-gray-300 rounded p-2 text-xs"  value={formData.saleDiscount} onChange={handleChange} />
                    </div>
  
                    {/* Low Level Limit */}
                    <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Low Level Limit</label>
                        <input type="text" name="lowLevelLimit" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.lowLevelLimit} onChange={handleChange} />
                    </div>

                    {/* Warranty */}
                    <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium p-2">Warranty</label>
                        <input type="text" name="warranty" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.warranty} onChange={handleChange} />
                    </div>

                    {/* Location / Rack */}
                    <div className="col-span-2 grid grid-cols-3 m-2">
                        <label className="text-xs font-medium p-2">Location / Rack</label>
                        <input type="text" name="location" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.location} onChange={handleChange} />
                    </div>

                    {/* Serial No. */}
                    <div className="col-span-2 grid grid-cols-3 m-2">
                        <label className="text-xs font-medium p-2">Serial No.</label>
                        <input type="text" name="serialNumber" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.serialNumber} onChange={handleChange} />
                    </div>

                  </div>
                    
                    {/* Product Description */}
                    <TextField
                      label="Product Description"
                      variant="outlined"
                      fullWidth
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    /> 


                  {/* Settings */}
                  <div className="border border-gray-300 col-span-5 relative">
                    <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                      Settings
                  </div>
  
                  <div className=" flex m-2 mt-7">
                  <div className="flex flex-col gap-2">
                    {/* Print Description */}
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="printDescription"
                        checked={formData.printDescription}
                        onChange={(e) => handleChange({ target: { name: "printDescription", value: e.target.checked } })}
                        className="mr-2"
                      />
                      Print Description
                    </label>

                    {/* One Click Sale */}
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="oneClickSale"
                        checked={formData.oneClickSale}
                        onChange={(e) => handleChange({ target: { name: "oneClickSale", value: e.target.checked } })}
                        className="mr-2"
                      />
                      One Click Sale
                    </label>

                    {/* Enable Tracking */}
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="enableTracking"
                        checked={formData.enableTracking}
                        onChange={(e) => handleChange({ target: { name: "enableTracking", value: e.target.checked } })}
                        className="mr-2"
                      />
                      Enable Tracking
                    </label>

                    {/* Print Serial No */}
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="printSerialNo"
                        checked={formData.printSerialNo}
                        onChange={(e) => handleChange({ target: { name: "printSerialNo", value: e.target.checked } })}
                        className="mr-2"
                      />
                      Print Serial No
                    </label>

                    {/* Not for Sale */}
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="notForSale"
                        checked={formData.notForSale}
                        onChange={(e) => handleChange({ target: { name: "notForSale", value: e.target.checked } })}
                        className="mr-2"
                      />
                      Not for Sale
                    </label>
                  </div>
                  </div>
                  </div>  
                </div>
                
              </div>
            )}
  
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} className="text-white" /> : "Create Product"}
            </Button>
          </form>
        </div>
      </div>
    );
  };

export default CreateProduct