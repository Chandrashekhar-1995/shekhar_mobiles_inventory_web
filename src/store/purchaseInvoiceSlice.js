import { createSlice } from "@reduxjs/toolkit";

const PurchaseInvoiceSlice = createSlice({
    name: "purchaseInvoices",
    initialState: {
        allInvoices: null,
    },
    reducers: {
        addPurchaseInvoices: (state, action) => {
            state.allInvoices = action.payload;
        },
        clearPurchaseInvoices: (state) => {
            state.allInvoices = null;
        },
    },
});

export const { addPurchaseInvoices, clearPurchaseInvoices } = PurchaseInvoiceSlice.actions;
export default PurchaseInvoiceSlice.reducer;
