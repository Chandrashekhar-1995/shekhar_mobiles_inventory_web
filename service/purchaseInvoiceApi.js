import apiClient from "./apiClient";


const lastPurchaseInvoice = () => {
    return apiClient.customFetch("/invoice/last-invoice");
};

const createPurchaseInvoice = (formData) => {
    return apiClient.customFetch("/purchase-invoice/create", {
        method: "POST",
        body: JSON.stringify(formData)
    });
};

const allPurchaseInvoice = () => {
    return apiClient.customFetch("/purchase-invoice/all");
};

const getPurchaseInvoiceById = (id) => {
    return apiClient.customFetch(`/purchase-invoice/${id}`);
};

const searchPurchaseInvoice = () => {
    return apiClient.customFetch("/purchase-invoice");
};

const updatePurchaseInvoice = (id, formData) => {
    return apiClient.customFetch(`/purchase-invoice/${id}`,{
        method: "PUT",
        body: JSON.stringify(formData)
    });
};

const deletePurchaseInvoice = (id) => {
    return apiClient.customFetch(`/purchase-invoice/${id}`,{
        method: "DELETE",
    });
};


export {
    lastPurchaseInvoice,
    createPurchaseInvoice,
    allPurchaseInvoice,
    getPurchaseInvoiceById,
    searchPurchaseInvoice,
    updatePurchaseInvoice,
    deletePurchaseInvoice,
}