import { createSlice } from "@reduxjs/toolkit";

const PurchaseInvoiceSlice = createSlice({
    name: "purchaseInvoices",
    initialState: [],
    reducers: {
        addPurchaseInvoices: (state, action) => {
            return action.payload;
        },
        clearPurchaseInvoices: (state) => {
            return [];
        },
    },
});

export const { addPurchaseInvoices, clearPurchaseInvoices } = PurchaseInvoiceSlice.actions;
export default PurchaseInvoiceSlice.reducer;
