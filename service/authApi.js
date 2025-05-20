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

const passwordResetRequest = (formData) => {
    return apiClient.customFetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const passwordReset = (userId, newPassword) => {
    return apiClient.customFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(userId, newPassword)
    });
};


export {
    checkAuth,
    register,
    login,
    logout,
    passwordResetRequest,
    passwordReset
}