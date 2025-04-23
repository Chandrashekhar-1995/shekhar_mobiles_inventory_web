import { createSlice } from "@reduxjs/toolkit";

const mobileSlice = createSlice({
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


export const {addBrand, removeBrand} = mobileSlice.actions;

export default mobileSlice.reducer;