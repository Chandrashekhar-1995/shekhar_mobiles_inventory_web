import { createSlice } from "@reduxjs/toolkit";

const supplierSlice = createSlice({
    name:"supplier",
    initialState:{
        allSuppliers: null,
    },
    reducers:{
        addSupplier:(state, action)=>{
            state.allSuppliers = action.payload;
        },
        removeSupplier:(state,action)=>{
            state.allSuppliers = null;
        },
    },
});


export const {addSupplier, removeSupplier} = supplierSlice.actions;

export default supplierSlice.reducer;