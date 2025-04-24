import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createCategory, createSubCategory } from "../../../../service/categoryApi";
import useFetchCategories from "../../../hooks/useFetchCategories";

const CategoryDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [subcategoryInput, setSubcategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useFetchCategories();

  const allCategories = useSelector((store) => store.categories.allCategories);

  const filteredCategories = query === "" ? allCategories : allCategories.filter((category) =>
          category.categoryName?.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (categoryObj) => {
    setSelectedCategory(categoryObj);
    setQuery(categoryObj.categoryName);
    setFormData({ ...formData, category: categoryObj.categoryName });
  };

  const handleBlur = () => {
    const categoryExists = allCategories.some(
      (c) => c.categoryName.toLowerCase() === query.toLowerCase()
    );
    if (query && !categoryExists) {
      setNewCategoryName(query);
      setShowModal(true);
    }
  };

  const addCategory = async () => {
      try {
        const data = await createCategory({
          categoryName: newCategoryName,
        });

        console.log(data)
        if(data.success){
          setFormData({ ...formData, category: newCategoryName });
          setSelectedCategory(data.data)
          alert(`✅ ${data.message}`)
        } else {
          alert(`❌ ${data.message}` || "Creatogery create failed:");
        }

      } catch (error) {
        console.error(error);
      } finally {
        setShowModal(false);
      }
    };

  const cancelCreate = () => {
    setFormData({ ...formData, category: "" });
    setQuery("");
    setShowModal(false);
  };

  const handleAddSubcategory = async () => {
    if (!subcategoryInput.trim() || !selectedCategory?._id) return;

    try {
        const data = await createSubCategory({category:newCategoryName, subcategories:subcategoryInput});
        console.log("Subcategory added:",data);
        if (data.success) { 
            alert(`✅ ${data.message}` || "Subcategory added")
            setFormData({ ...formData, subcategory: subcategoryInput });
          } else {
            alert(`❌ ${data.message}` || "Failed to add subcategory");
            setSubcategoryInput("");
          }
    } catch (error) {
      console.error(error)
    }
  };

  return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">Category *</span>
        </label>
        <Combobox value={query} onChange={handleSelect}>
          <div className="relative">
            <Combobox.Input
              className="input input-bordered w-full"
              onChange={(e) => setQuery(e.target.value)}
              onBlur={handleBlur}
              displayValue={() => query}
              placeholder="Type Category Name"
            />
            {allCategories && filteredCategories.length > 0 && (
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


        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black  bg-op z-20">
            <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
              <h2 className="text-lg font-semibold">Create new brand "{newCategoryName}"?</h2>
              <div className="flex justify-center gap-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={addCategory}
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

export default CategoryDropdown;
