import apiClient from "./apiClient";


const createAccount = (formData) => {
    return apiClient.customFetch("/account/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
}; 

const getAllAccount = () => {
    return apiClient.customFetch("/account/all");
};

const getAccountById = (id) => {
    return apiClient.customFetch(`/account/${id}`);
};

const searchAccount = () => {
    return apiClient.customFetch("/account");
};

const updateAccount = (id, formData) => {
    return apiClient.customFetch(`/account/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteAccount = (id) => {
    return apiClient.customFetch(`/account/${id}`,{
        method: "DELETE",
    });
};


export {
    createAccount,
    getAllAccount,
    getAccountById,
    searchAccount,
    updateAccount,
    deleteAccount
}