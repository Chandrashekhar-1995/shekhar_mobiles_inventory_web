import apiClient from "./apiClient";

const createCustomer = (formData) => {
    return apiClient.customFetch("/customer/create", {
        method: "POST",
        body: JSON.stringify(formData),
    });
};

const getAllCustomers = () => {
    return apiClient.customFetch("/customer/all");
};

const getCustomerById = (id) => {
    return apiClient.customFetch(`/customer/${id}`);
};

const searchCustomer = () => {
    return apiClient.customFetch("/customer");
};

const updateCustomer = (id, formData) => {
    return apiClient.customFetch(`/customer/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
    });
};

const deleteCustomer = (id) => {
    return apiClient.customFetch(`/customer/${id}`, {
        method: "DELETE",
    });
};

const downloadCustomerTemplate = () => {
    return apiClient.customFetch("/customer/bulk-upload/template");
};

const bulkUploadCustomer = (formData) => {
    return apiClient.customFetch("/customer/bulk-upload", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};
export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    searchCustomer,
    updateCustomer,
    deleteCustomer,
    downloadCustomerTemplate,
    bulkUploadCustomer,
}