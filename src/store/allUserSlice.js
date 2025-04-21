import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
    name:"allUsers",
    initialState:{
        allUsers: null,
    },
    reducers:{
        addAllUser:(state, action)=>{
            state.allUsers = action.payload;
        },
        removeAllUser:(state,action)=>{
            state.allUsers = null;
        },
    },
});


export const {addAllUser, removeAllUser} = allUserSlice.actions;

export default allUserSlice.reducer;