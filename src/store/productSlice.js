import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"brand",
    initialState:{
        allProducts: null,
    },
    reducers:{
        addProduct:(state, action)=>{
            state.allProducts = action.payload;
        },
        removeProduct:(state,action)=>{
            state.allProducts = null;
        },
    },
});


export const {addProduct, removeProduct} = productSlice.actions;

export default productSlice.reducer;