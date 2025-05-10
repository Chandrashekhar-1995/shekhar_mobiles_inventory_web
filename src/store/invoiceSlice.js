import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
      allInvoices: null,
      loading: false,
      error: null
    },
    reducers: {
      addInvoices: (state, action) => {
        state.allInvoices = action.payload;
        state.loading = false;
      },
      setLoading: (state) => {
        state.loading = true;
      },
      setError: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
      clearInvoices: (state) => {
        state.allInvoices = null;
      },
    },
  });
  
  export const { addInvoices, clearInvoices, setLoading, setError } = invoiceSlice.actions;
  export default invoiceSlice.reducer;