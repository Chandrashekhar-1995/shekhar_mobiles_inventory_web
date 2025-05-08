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

export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    searchCustomer,
    updateCustomer,
    deleteCustomer,
}