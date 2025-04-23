import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
    name:"mobile",
    initialState:{
        allMobiles: null,
    },
    reducers:{
        addMobile:(state, action)=>{
            state.allMobiles = action.payload;
        },
        removeMobile:(state,action)=>{
            state.allMobiles = null;
        },
    },
});


export const {addMobile, removeMobile} = brandSlice.actions;

export default brandSlice.reducer;