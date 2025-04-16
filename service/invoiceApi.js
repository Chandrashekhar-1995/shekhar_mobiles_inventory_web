import apiClient from "./apiClient";


const lastInvoice = () => {
    return apiClient.customFetch("/invoice/last-invoice");
};

const createInvoice = (formData) => {
    return apiClient.customFetch("/invoice/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allInvoice = () => {
    return apiClient.customFetch("/invoice/all");
};

const getInvoiceById = (id) => {
    return apiClient.customFetch(`/invoice/${id}`);
};

const searchInvoice = () => {
    return apiClient.customFetch("/invoice");
};

const updateInvoice = (id, formData) => {
    return apiClient.customFetch(`/invoice/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deleteInvoice = (id) => {
    return apiClient.customFetch(`/invoice/${id}`,{
        method: "DELETE",
    });
};


export {
    lastInvoice,
    createInvoice,
    allInvoice,
    getInvoiceById,
    searchInvoice,
    updateInvoice,
    deleteInvoice,
}