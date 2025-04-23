import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
    name:"model",
    initialState:{
        allModels: null,
    },
    reducers:{
        addModel:(state, action)=>{
            state.allModels = action.payload;
        },
        removeModel:(state,action)=>{
            state.allModels = null;
        },
    },
});


export const {addModel, removeModel} = modelSlice.actions;

export default modelSlice.reducer;