import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name:"categories",
    initialState:{
        allCategories: null,
    },
    reducers:{
        addCategory:(state, action)=>{
            state.allCategories = action.payload;
        },
        removeCategory:(state,action)=>{
            state.allCategories = null;
        },
    },
});


export const {addCategory, removeCategory} = categorySlice.actions;

export default categorySlice.reducer;