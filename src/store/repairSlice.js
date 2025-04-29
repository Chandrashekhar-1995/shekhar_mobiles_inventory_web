import { createSlice } from "@reduxjs/toolkit";

const repairSlice = createSlice({
    name: "repair",
    initialState: {
        allRepairs: null,
        loading: false,
        error: null
    },
    reducers: {
        // Set all repairs (existing)
        addRepair: (state, action) => {
            state.allRepairs = action.payload;
            state.loading = false;
            state.error = null;
        },
        
        // Clear all repairs (existing)
        removeRepair: (state) => {
            state.allRepairs = null;
        },
        
        // New reducer for setting loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        // New reducer for setting error
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        // New reducer for updating a single repair's status
        updateRepairStatus: (state, action) => {
            if (state.allRepairs) {
                state.allRepairs = state.allRepairs.map(repair => 
                    repair._id === action.payload.repairId
                        ? { ...repair, repairStatus: action.payload.status }
                        : repair
                );
            }
        },
        
        // New reducer for completely replacing repairs array
        setAllRepairs: (state, action) => {
            state.allRepairs = action.payload;
        }
    },
});

// Export all actions
export const { 
    addRepair, 
    removeRepair,
    setLoading,
    setError,
    updateRepairStatus,
    setAllRepairs
} = repairSlice.actions;

export default repairSlice.reducer;