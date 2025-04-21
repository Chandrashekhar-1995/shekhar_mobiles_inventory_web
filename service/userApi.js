import apiClient from "./apiClient";

// create user by admin
const createUser = (formData) => {
    return apiClient.customFetch("/user/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const getAllUser = () => {
    return apiClient.customFetch("/user/all");
};

const getUserById = (id) => {
    return apiClient.customFetch(`/user/${id}`);
};

const searchUser = () => {
    return apiClient.customFetch("/user");
};

const updateUser = (id, formData) => {
    return apiClient.customFetch(`/user/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteUser = (id) => {
    return apiClient.customFetch(`/user/${id}`,{
        method: "DELETE",
    });
};

const downloadUserTemplate = () => {
    return apiClient.customFetch("/user/bulk-upload/template");
};

const bulkUploadUser = (formData) => {
    return apiClient.customFetch("/user/bulk-upload", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

export {
    createUser,
    getAllUser,
    getUserById,
    searchUser,
    updateUser,
    deleteUser,
    downloadUserTemplate,
    bulkUploadUser,
}