import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createNewCategory, createSubCategory } from "../../../service/categoryApi";
import useFetchCategories from "../../hooks/useFetchCategories";
import { toast } from "react-toastify";

const CategoryDropdown = ({ formData, setFormData }) => {
  const [query, setQuery] = useState("");
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useFetchCategories();
  const allCategories = useSelector((store) => store.categories.allCategories);

  const filteredCategories = query === ""
    ? allCategories
    : allCategories.filter((category) =>
        category.categoryName?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (categoryObj) => {
    setSelectedCategory(categoryObj);
    setQuery(categoryObj.categoryName);
    setFormData({ ...formData, category: categoryObj.categoryName, subCategory: "" });
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
      const data = await createNewCategory({
        categoryName: newCategoryName,
      });

      if (data.success) {
        setFormData({ ...formData, category: newCategoryName, subCategory: "" });
        setSelectedCategory(data.data);
        toast.success(`✅ ${data.message}`);
      } else {
        toast.error(`❌ ${data.message}` || "Category creation failed");
      }
    } catch (error) {
  
    } finally {
      setShowModal(false);
    }
  };

  const cancelCreate = () => {
    setFormData({ ...formData, category: "", subCategory: "" });
    setQuery("");
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleAddSubCategory = async () => {
    if (!subCategoryInput.trim() || !selectedCategory?._id) return;

    try {
      const data = await createSubCategory({
        category: selectedCategory.categoryName,
        subCategories: subCategoryInput,
      });

      if (data.success) {
        toast.success(`✅ ${data.message}`);
        setFormData({ ...formData, subCategory: subCategoryInput });
        setSubCategoryInput("");
      } else {
        toast.error(`❌ ${data.message}` || "Failed to add subCategory");
      }
    } catch (error) {

    }
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs">Category *</span>
      </label>
      <Combobox value={query} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="input input-bordered input-sm text-xs w-full"
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            displayValue={() => query}
            placeholder="Type Category Name"
          />
          {filteredCategories?.length > 0 && (
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

      {/* Subcategory Section */}
      {selectedCategory && (
        <div className="mt-4">
          {selectedCategory.subCategories?.length > 0 && (
            <>
              <label className="label">
                <span className="label-text text-xs">Subcategory</span>
              </label>
              <select
                className="select select-bordered select-sm text-xs w-full"
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
                value={formData.subCategory || ""}
              >
                <option value="">Select SubCategory</option>
                {selectedCategory.subCategories.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Add new subcategory */}
          <div className="mt-3">
            <input
              type="text"
              value={subCategoryInput}
              onChange={(e) => setSubCategoryInput(e.target.value)}
              placeholder="Add new subCategory"
              className="input input-bordered input-sm text-xs w-full"
            />
            <button
              onClick={handleAddSubCategory}
              className="btn btn-primary btn-sm mt-2 w-full"
            >
              Add Subcategory
            </button>
          </div>
        </div>
      )}

      {/* Modal for new category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center opacity-80 bg-black z-20">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold">
              Create new category "{newCategoryName}"?
            </h2>
            <div className="flex justify-center gap-4">
              <button className="btn btn-success btn-sm" onClick={addCategory}>
                Yes
              </button>
              <button className="btn btn-error btn-sm" onClick={cancelCreate}>
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
