import apiClient from "./apiClient";


const createProduct = (formData) => {
    return apiClient.customFetch("/product/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allProduct = () => {
    return apiClient.customFetch("/product/all");
};

const getProductById = (id) => {
    return apiClient.customFetch(`/product/${id}`);
};

const searchProduct = () => {
    return apiClient.customFetch("/product");
};

const updateProduct = (id, formData) => {
    return apiClient.customFetch(`/product/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteProduct = (id) => {
    return apiClient.customFetch(`/product/${id}`,{
        method: "DELETE",
    });
};

const downloadProductTemplate = () => {
    return apiClient.customFetch("/product/bulk-upload/template");
};

const bulkUploadProduct = (formData) => {
    return apiClient.customFetch("/product/bulk-upload", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

export {
    createProduct,
    allProduct,
    getProductById,
    searchProduct,
    updateProduct,
    deleteProduct,
    downloadProductTemplate,
    bulkUploadProduct,
}