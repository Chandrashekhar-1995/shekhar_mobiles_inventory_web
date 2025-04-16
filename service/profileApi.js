import apiClient from "./apiClient";


const getProfile = () => {
    return apiClient.customFetch("/profile");
};

const updateProfile = (id, formData) => {
    return apiClient.customFetch(`/profile/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

// delete profile by logged in user
const deleteProfile = (id) => {
    return apiClient.customFetch(`/profile/${id}`,{
        method: "DELETE",
    });
};

export {
    getProfile,
    updateProfile,
    deleteProfile,
}