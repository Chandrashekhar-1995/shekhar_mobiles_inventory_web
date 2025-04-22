import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
        allInvoices: null,
    },
    reducers: {
        addInvoices: (state, action) => {
            state.allInvoices = action.payload;
        },
        clearInvoices: (state) => {
            state.allInvoices = null;
        },
    },
});

export const { addInvoices, clearInvoices } = invoiceSlice.actions;
export default invoiceSlice.reducer;
