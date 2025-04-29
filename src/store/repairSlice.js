import { createSlice } from "@reduxjs/toolkit";

const repairSlice = createSlice({
    name:"repair",
    initialState:{
        allRepairs: null,
    },
    reducers:{
        addRepair:(state, action)=>{
            state.allRepairs = action.payload;
        },
        removeRepair:(state,action)=>{
            state.allRepairs = null;
        },
    },
});


export const {addRepair, removeRepair} = repairSlice.actions;

export default repairSlice.reducer;