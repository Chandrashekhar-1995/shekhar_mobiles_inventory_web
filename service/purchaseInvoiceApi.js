import apiClient from "./apiClient";


const lastPurchaseInvoice = () => {
    return apiClient.customFetch("/purchase-invoice/last-invoice");
};

const createNewPurchaseInvoice = (formData) => {
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
    createNewPurchaseInvoice,
    allPurchaseInvoice,
    getPurchaseInvoiceById,
    searchPurchaseInvoice,
    updatePurchaseInvoice,
    deletePurchaseInvoice,
}