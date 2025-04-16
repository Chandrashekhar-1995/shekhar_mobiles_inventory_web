import apiClient from "./apiClient";


const createCategory = (formData) => {
    return apiClient.customFetch("/category/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allCategory = () => {
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

const deleteCategory = (id) => {
    return apiClient.customFetch(`/category/${id}`,{
        method: "DELETE",
    });
};


export {
    createCategory,
    allCategory,
    getCategoryById,
    searchCategory,
    updateCategory,
    deleteCategory,
}