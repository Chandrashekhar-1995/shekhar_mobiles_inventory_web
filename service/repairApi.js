import apiClient from "./apiClient";


const lastRepair = () => {
    return apiClient.customFetch("/repair/last-repair");
};

const createNewRepair = (formData) => {
    return apiClient.customFetch("/repair/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllRepairs = () => {
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

const updateRepairItem = (id, formData) => {
    return apiClient.customFetch(`/repair/update/repair-item/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};


const deleteRepair = (id) => {
    return apiClient.customFetch(`/repair/${id}`,{
        method: "DELETE",
    });
};


// Repair Process

const createRepairProcess = (formData) => {
    return apiClient.customFetch("/repair-process/create", { 
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllRepairProcesses = () => {
    return apiClient.customFetch("/repair-process/all");
};

const getRepairProcessById = (id) => {
    return apiClient.customFetch(`/repair-process/${id}`);
};

const getRepairProcessesByFault = (faultType) => {
    return apiClient.customFetch(`/repair-process/by-fault/${faultType}`);
};

const getFaultTypes = () => {
    return apiClient.customFetch("/repair-process/fault-types");
};

const deleteRepairProcess = (id) => {
    return apiClient.customFetch(`/repair-process/${id}`,{
        method: "DELETE",
    });
};

export {
    lastRepair,
    createNewRepair,
    getAllRepairs,
    getRepairById,
    searchRepair,
    updateRepair,
    updateRepairItem,
    deleteRepair,
    createRepairProcess,
    getAllRepairProcesses,
    getRepairProcessById,
    getRepairProcessesByFault,
    getFaultTypes,
    deleteRepairProcess,
    
};