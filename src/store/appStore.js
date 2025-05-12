import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";
import allUserReducer from "./allUserSlice";
import brandReducer from "./brandSlice";
import modelReducer from "./modelSlice";
import mobileReducer from "./mobileSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import invoiceReducer from "./invoiceSlice";
import repairReducer from "./repairSlice";
import accountReducer from "./accountSlice";
import faultReducer from "./faultSlice";
import repairProcessReducer from "./repairProcessSlice";
import purchaseInvoicesReducer from "./purchaseInvoiceSlice";
import customerReducer from "./customerSlice";
import supplierReducer from "./supplierSlice";
import salesReducer from "./salesSlice";
import purchaseReducer from "./purchaseSlice";
import repairBookingReducer from "./repairBookingSlice";

// Combine all reducers
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  user: userReducer,
  allUsers: allUserReducer,
  brands: brandReducer,
  models: modelReducer,
  mobiles: mobileReducer,
  categories: categoryReducer,
  products: productReducer,
  invoices: invoiceReducer,
  repairs: repairReducer,
  accounts: accountReducer,
  faults: faultReducer,
  repairProcesses:repairProcessReducer,
  purchaseInvoices: purchaseInvoicesReducer,
  customers: customerReducer,
  suppliers: supplierReducer,
  sales: salesReducer,
  purchases: purchaseReducer,
  repairBooking: repairBookingReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "accounts", "repairProcesses"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(appStore);

export default appStore;
