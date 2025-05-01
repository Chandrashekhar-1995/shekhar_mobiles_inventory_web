import apiClient from "./apiClient";

const checkAuth = () => {
    return apiClient.customFetch("/auth/check");
};

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
    checkAuth,
    register,
    login,
    logout,
}