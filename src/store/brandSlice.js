import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
    name:"brand",
    initialState:{
        allBrands: null,
    },
    reducers:{
        addBrand:(state, action)=>{
            state.allBrands = action.payload;
        },
        removeBrand:(state,action)=>{
            state.allBrands = null;
        },
    },
});


export const {addBrand, removeBrand} = brandSlice.actions;

export default brandSlice.reducer;