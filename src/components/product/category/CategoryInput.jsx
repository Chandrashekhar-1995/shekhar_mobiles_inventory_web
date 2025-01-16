import React from "react";

const CategoryInput = ({ categories, value, onChange }) => {
  return (
    <div className="col-span-2 grid grid-cols-3 m-2">
      <label className="text-xs font-medium p-2">Category</label>
      <select
        name="category"
        className="col-span-2 border border-gray-300 rounded p-2 text-xs"
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
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
      </select>
    </div>

    
  );
};

export default CategoryInput;

//  jaha ye use hoga 
//  <CategoryInput
//                     categories={categories}
//                     value={formData.category}
//                     onChange={handleChange}
//                     />  








// import React, { useState } from "react";

// const CategoryManager = () => {
//   const [categories, setCategories] = useState([
//     "Action",
//     "Adventure",
//     "Acting",
//     "Comedy",
//     "Drama",
//   ]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showWarning, setShowWarning] = useState(false);
//   const [newCategory, setNewCategory] = useState("");

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     const matchingCategories = categories.filter((category) =>
//       category.toLowerCase().includes(value.toLowerCase())
//     );

//     if (value && matchingCategories.length === 0) {
//       setShowWarning(true);
//       setNewCategory(value);
//     } else {
//       setShowWarning(false);
//     }
//   };

//   const handleAddCategory = () => {
//     setCategories((prevCategories) => [...prevCategories, newCategory]);
//     setShowWarning(false);
//     setSearchTerm("");
//   };

//   const handleCancel = () => {
//     setShowWarning(false);
//     setSearchTerm("");
//   };

//   const filteredCategories = categories.filter((category) =>
//     category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>Category Manager</h2>
//       <input
//         type="text"
//         placeholder="Search or add a category..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//       />
//       {showWarning && (
//         <div style={{ marginBottom: "10px", color: "red" }}>
//           <p>
//             The category <strong>{newCategory}</strong> does not exist. Do you
//             want to create it?
//           </p>
//           <button onClick={handleAddCategory} style={{ marginRight: "10px" }}>
//             Yes
//           </button>
//           <button onClick={handleCancel}>No</button>
//         </div>
//       )}
//       <ul>
//         {filteredCategories.map((category, index) => (
//           <li key={index}>{category}</li>
//         ))}
//         {filteredCategories.length === 0 && !showWarning && (
//           <li>No matching categories found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default CategoryManager;
