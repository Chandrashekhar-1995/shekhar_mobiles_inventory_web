import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createBrand } from "../../../../service/brandApi";
import useFetchBrands from "../../../hooks/useFetchBrands";

const BrandDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  useFetchBrands();

  const allBrands = useSelector((store) => store.brands.allBrands);

  const filteredBrands =
    query === ""
      ? allBrands
      : allBrands.filter((brand) =>
          brand.brandName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (brandObj) => {
    setQuery(brandObj.brandName);
    setFormData(prev => ({
      ...prev,
      brandName: brandObj.brandName,
      brand: brandObj._id
      }));
  };
        

  const handleBlur = () => {
    const brandExists = allBrands.some(
      (b) => b.brandName.toLowerCase() === query.toLowerCase()
    );
    if (query && !brandExists) {
      setNewBrandName(query);      
      setShowModal(true);
    }
  };

  const addBrand = async (e) => {
    e.preventDefault();
    try {
      const data = await createBrand({ brandName: newBrandName });
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          brandName: newBrandName,
          brand: data.data._id
        }));
      }
    } catch (error) {
      console.error("Brand create failed:", error);
    } finally {
      setShowModal(false);
    }
  };
  

  const cancelCreate = () => {
    setFormData(prev => ({
      ...prev,
      brand: "",
      brandName: ""
    }));
    setQuery("");
    setShowModal(false);
  };
  
  return (
      <div className="form-control">
        <label className="label">
          <span className="label-text text-xs">Brand *</span>
        </label>
        <Combobox value={query} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="input input-bordered input-sm text-xs w-full"
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleBlur}
              displayValue={() => query}
              placeholder="Type Brand Name"
            />
            {allBrands && filteredBrands.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredBrands.map((brand) => (
                  <Combobox.Option
                    key={brand._id}
                    value={brand}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    {brand.brandName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black  bg-op z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
              <h2 className="text-lg font-semibold">Create new brand "{newBrandName}"?</h2>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={addBrand}
                >
                  Yes
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={cancelCreate}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default BrandDropdown;
