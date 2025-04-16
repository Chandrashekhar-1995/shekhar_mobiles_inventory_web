import apiClient from "./apiClient";


const createMobile = (formData) => {
    return apiClient.customFetch("/mobile/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allMobile = () => {
    return apiClient.customFetch("/mobile/all");
};

const getMobileById = (id) => {
    return apiClient.customFetch(`/mobile/${id}`);
};

const searchMobile = () => {
    return apiClient.customFetch("/mobile");
};

const updateMobile = (id, formData) => {
    return apiClient.customFetch(`/mobile/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteMobile = (id) => {
    return apiClient.customFetch(`/mobile/${id}`,{
        method: "DELETE",
    });
};


export {
    createMobile,
    allMobile,
    getMobileById,
    searchMobile,
    updateMobile,
    deleteMobile,
}