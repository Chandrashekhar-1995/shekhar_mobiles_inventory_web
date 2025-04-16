import apiClient from "./apiClient";

const register = (formData) => {
    return apiClient.customFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const login = (formData) => {
    return apiClient.customFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const logout = () => {
    return apiClient.customFetch("/auth/logout", {
        method: "POST"
    });
};


export {
    register,
    login,
    logout,
    getProfile,
}