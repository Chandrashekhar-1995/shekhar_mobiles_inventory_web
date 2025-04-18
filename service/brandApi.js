import apiClient from "./apiClient";


const createBrand = (formData) => {
    return apiClient.customFetch("/brand/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllBrand = () => {
    return apiClient.customFetch("/brand/all");
};

const getBrandById = (id) => {
    return apiClient.customFetch(`/brand/${id}`);
};

const searchBrand = () => {
    return apiClient.customFetch("/brand");
};

const updateBrand = (id, formData) => {
    return apiClient.customFetch(`/brand/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteBrand = (id) => {
    return apiClient.customFetch(`/brand/${id}`,{
        method: "DELETE",
    });
};


export {
    createBrand,
    getAllBrand,
    getBrandById,
    searchBrand,
    updateBrand,
    deleteBrand,
}