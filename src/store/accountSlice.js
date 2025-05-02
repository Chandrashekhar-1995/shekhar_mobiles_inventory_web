import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name:"account",
    initialState:{
        allAccounts: null,
    },
    reducers:{
        addAccount:(state, action)=>{
            state.allAccounts = action.payload;
        },
        removeAccount:(state,action)=>{
            state.allAccounts = null;
        },
    },
});


export const {addAccount, removeAccount} = accountSlice.actions;

export default accountSlice.reducer;