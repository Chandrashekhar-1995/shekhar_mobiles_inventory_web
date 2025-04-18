import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createSubCategory } from "../../../../service/categoryApi";

const CategoryDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [subcategoryInput, setSubcategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const allCategories = useSelector((store) => store.categories.allCategories);

  const filteredCategories = query === "" ? allCategories : allCategories.filter((category) =>
          category.categoryName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (categoryObj) => {
    setSelectedCategory(categoryObj);
    setQuery(categoryObj.categoryName);
    setFormData({ ...formData, category: categoryObj.categoryName });
  };

  const handleAddSubcategory = async () => {
    if (!subcategoryInput.trim() || !selectedCategory?._id) return;

    try {
        const data = await createSubCategory(formData);
        console.log("Subcategory added:",data);
        if (data.success) { 
            alert(`✅ ${data.message}`)
            setSubcategoryInput("");
          } else {
            alert(`❌ ${data.message}` || "Failed to add subcategory");
          }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    allCategories?.length > 0 && (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Category *</span>
        </label>
        <Combobox value={query} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="input input-bordered w-full"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={() => query}
              placeholder="Type Category Name"
            />
            {filteredCategories.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {filteredCategories.map((category) => (
                  <Combobox.Option
                    key={category._id}
                    value={category}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${
                        active ? "bg-blue-500 text-white" : "text-black"
                      }`
                    }
                  >
                    {category.categoryName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </div>
        </Combobox>

        {/* Show subcategory dropdown if category selected */}
        {selectedCategory && (
          <div className="mt-4">
            {selectedCategory.subcategories?.length > 0 && (
              <>
                <label className="label">
                  <span className="label-text">Subcategory</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  value={formData.subcategory || ""}
                >
                  <option value="">Select Subcategory</option>
                  {selectedCategory.subcategories.map((sub, i) => (
                    <option key={i} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* Input field for adding new subcategory */}
            <div className="mt-3">
              <input
                type="text"
                value={subcategoryInput}
                onChange={(e) => setSubcategoryInput(e.target.value)}
                placeholder="Add new subcategory"
                className="input input-bordered w-full"
              />
              <button
                onClick={handleAddSubcategory}
                className="btn btn-primary mt-2 w-full"
              >
                Add Subcategory
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CategoryDropdown;
