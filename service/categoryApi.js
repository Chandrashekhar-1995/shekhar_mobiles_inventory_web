import apiClient from "./apiClient";


const createCategory = (formData) => {
    return apiClient.customFetch("/category/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const createSubCategory = (formData) => {
    return apiClient.customFetch("/category/add-subcategory", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllCategories = () => {
    return apiClient.customFetch("/category/all");
};

const getCategoryById = (id) => {
    return apiClient.customFetch(`/category/${id}`);
};

const searchCategory = () => {
    return apiClient.customFetch("/category");
};

const updateCategory = (id, formData) => {
    return apiClient.customFetch(`/category/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const updateSubCategory = (id, formData) => {
    return apiClient.customFetch(`/category/subCategory/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteCategory = (id) => {
    return apiClient.customFetch(`/category/${id}`,{
        method: "DELETE",
    });
};

const deleteSubCategory = (id) => {
    return apiClient.customFetch(`/category/subCategory/${id}`,{
        method: "DELETE",
    });
};


export {
    createCategory,
    createSubCategory,
    getAllCategories,
    getCategoryById,
    searchCategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory,
}