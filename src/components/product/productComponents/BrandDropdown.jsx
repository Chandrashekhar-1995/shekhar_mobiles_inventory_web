import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";

const BrandDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");

  const allBrands = useSelector((store) => store.brands.allBrands);

  const filteredBrands = query === "" ? allBrands : allBrands.filter((brand) =>
          brand.brandName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (brandObj) => {
    setQuery(brandObj.brandName);
    setFormData({ ...formData, brand: brandObj.brandName });
  };

  return (
    allBrands?.length > 0 && (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Brand *</span>
        </label>
        <Combobox value={query} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="input input-bordered w-full"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={() => query}
              placeholder="Type Brand Name"
            />
            {filteredBrands.length > 0 && (
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
      </div>
    )
  );
};

export default BrandDropdown;
