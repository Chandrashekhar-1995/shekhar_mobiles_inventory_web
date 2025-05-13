import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../service/apiClient";

export const fetchLast90DaysRepairBooking = createAsyncThunk(
  "repair/fetchLast90DaysRepairBooking",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/repair/last-90days-repair-booking"); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch repair booking data");
    }
  }
);

export const fetchTodayRepairBookingSummary = createAsyncThunk(
  "repair/fetchTodayRepairBookingSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/repair/today-repair-Booking-summary");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch today's repair booking summary");
    }
  }
);

const repairBookingSlice = createSlice({
  name: "repairBooking",
  initialState: {
    last90DaysRepairBookingData: [],
    todayRepairBookingSummary: { totalRepairPrice: 0, bookRepairCount: 0 },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLast90DaysRepairBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLast90DaysRepairBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.last90DaysRepairBookingData = action.payload;
      })
      .addCase(fetchLast90DaysRepairBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTodayRepairBookingSummary.fulfilled, (state, action) => {
        state.todayRepairBookingSummary = action.payload;
      });
  }
});

export default repairBookingSlice.reducer;