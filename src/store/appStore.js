import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import brandReducer from "./brandSlice";
import categoryReducer from "./categorySlice";
import invoiceReducer from './invoiceSlice';
import purchaseInvoicesReducer from './purchaseInvoiceSlice';
import supplierReducer from './supplierSlice';

// Load user from localStorage
const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  
  // Save user to localStorage
  const saveUserToLocalStorage = (state) => {
    localStorage.setItem('user', JSON.stringify(state.user));
  };
  
  // Initial State with LocalStorage
  const preloadedState = {
    user: loadUserFromLocalStorage(),
  };

const appStore = configureStore({
    reducer:{
        user: userReducer,
        brands:brandReducer,
        categories:categoryReducer,
        invoices: invoiceReducer,
        purchaseInvoices: purchaseInvoicesReducer,
        suppliers: supplierReducer,
    },
    preloadedState,
});

// Subscribe to store changes
appStore.subscribe(() => {
    const state = appStore.getState();
    saveUserToLocalStorage(state);
  });

export default appStore;