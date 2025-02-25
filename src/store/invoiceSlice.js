import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: [],
    reducers: {
        addInvoices: (state, action) => {
            return action.payload;
        },
        clearInvoices: (state) => {
            return [];
        },
    },
});

export const { addInvoices, clearInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
