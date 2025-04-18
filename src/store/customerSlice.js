import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name:"customer",
    initialState:{
        allCustomers: null,
    },
    reducers:{
        addCustomer:(state, action)=>{
            state.allCustomers = action.payload;
        },
        removeCustomer:(state,action)=>{
            state.allCustomers = null;
        },
    },
});


export const {addCustomer, removeCustomer} = customerSlice.actions;

export default customerSlice.reducer;