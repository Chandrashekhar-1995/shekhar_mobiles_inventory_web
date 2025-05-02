import { createSlice } from "@reduxjs/toolkit";

const repairProcessSlice = createSlice({
    name: "repairProcess",
    initialState: {
        allProcesses: null,
        faultTypes: null
    },
    reducers: {
        setAllProcesses: (state, action) => {
            state.allProcesses = action.payload;
        },
        setFaultTypes: (state, action) => {
            state.faultTypes = action.payload;
        },
        addProcess: (state, action) => {
            state.allProcesses = state.allProcesses 
                ? [...state.allProcesses, action.payload] 
                : [action.payload];
        }
    },
});

export const { setAllProcesses, setFaultTypes, addProcess } = repairProcessSlice.actions;

export default repairProcessSlice.reducer;