import { createSlice } from "@reduxjs/toolkit";

const mobileSlice = createSlice({
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


export const {addMobile, removeMobile} = mobileSlice.actions;

export default mobileSlice.reducer;