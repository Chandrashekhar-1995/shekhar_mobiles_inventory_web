import apiClient from "./apiClient";


const createNewModel = (formData) => {
    return apiClient.customFetch("/model/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllModel = () => {
    return apiClient.customFetch("/model/all");
};

const getModelById = (id) => {
    return apiClient.customFetch(`/model/${id}`);
};

const searchModel = () => {
    return apiClient.customFetch("/model");
};

const updateModel = (id, formData) => {
    return apiClient.customFetch(`/model/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteModel = (id) => {
    return apiClient.customFetch(`/model/${id}`,{
        method: "DELETE",
    });
};


export {
    createNewModel,
    getAllModel,
    getModelById,
    searchModel,
    updateModel,
    deleteModel,
}