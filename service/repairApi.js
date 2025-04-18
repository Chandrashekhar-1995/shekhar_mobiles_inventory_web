import apiClient from "./apiClient";


const lastRepair = () => {
    return apiClient.customFetch("/repair/last-repair");
};

const createRepair = (formData) => {
    return apiClient.customFetch("/repair/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allRepair = () => {
    return apiClient.customFetch("/repair/all");
};

const getRepairById = (id) => {
    return apiClient.customFetch(`/repair/${id}`);
};

const searchRepair = () => {
    return apiClient.customFetch("/repair");
};

const updateRepair = (id, formData) => {
    return apiClient.customFetch(`/repair/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteRepair = (id) => {
    return apiClient.customFetch(`/repair/${id}`,{
        method: "DELETE",
    });
};


export {
    lastRepair,
    createRepair,
    allRepair,
    getRepairById,
    searchRepair,
    updateRepair,
    deleteRepair,
}