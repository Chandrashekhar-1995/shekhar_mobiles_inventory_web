import { createSlice } from "@reduxjs/toolkit";

const faultSlice = createSlice({
    name:"fault",
    initialState:{
        allFaults: null,
    },
    reducers:{
        addFaults:(state, action)=>{
            state.allFaults = action.payload;
        },
        removeFaults:(state,action)=>{
            state.allFaults = null;
        },
    },
});


export const {addFaults, removeFaults} = faultSlice.actions;

export default faultSlice.reducer;