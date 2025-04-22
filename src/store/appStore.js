import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebarSlice';
import userReducer from "./userSlice";
import allUserReducer from "./allUserSlice";
import brandReducer from "./brandSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import invoiceReducer from './invoiceSlice';
import purchaseInvoicesReducer from './purchaseInvoiceSlice';
import customerReducer from './customerSlice';
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
        sidebar: sidebarReducer,
        user: userReducer,
        allUsers: allUserReducer,
        brands:brandReducer,
        categories:categoryReducer,
        products:productReducer,
        invoices: invoiceReducer,
        purchaseInvoices: purchaseInvoicesReducer,
        customers:customerReducer,
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