import apiClient from "./apiClient";


const createFault = (formData) => {
    return apiClient.customFetch("/fault/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const createSubFault = (formData) => {
    return apiClient.customFetch("/fault/add-subFault", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllFault = () => {
    return apiClient.customFetch("/fault/all");
};

const getFaultById = (id) => {
    return apiClient.customFetch(`/fault/${id}`);
};

const searchFault = () => {
    return apiClient.customFetch("/fault");
};

const updateFault = (id, formData) => {
    return apiClient.customFetch(`/fault/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteFault = (id) => {
    return apiClient.customFetch(`/fault/${id}`,{
        method: "DELETE",
    });
};

const deleteSubFault = (id) => {
    return apiClient.customFetch(`/fault/remove-subFault`,{
        method: "DELETE",
    });
};

export {
    createFault,
    createSubFault,
    getAllFault,
    getFaultById,
    searchFault,
    updateFault,
    deleteFault,
    deleteSubFault,
};