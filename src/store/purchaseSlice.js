import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../service/apiClient";

export const fetchLast90DaysPurchases = createAsyncThunk(
  'purchases/fetchLast90DaysPurchases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/purchase-invoice/last-90days-purchases");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch purchase data");
    }
  }
);

export const fetchTodayPurchaseSummary = createAsyncThunk(
  'purchases/fetchTodayPurchaseSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/purchase-invoice/today-purchase-summary");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch today's purchase summary");
    }
  }
);

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState: {
    last90DaysData: [],
    todaySummary: { totalPurchases: 0, invoiceCount: 0 },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLast90DaysPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLast90DaysPurchases.fulfilled, (state, action) => {
        state.loading = false;
        state.last90DaysData = action.payload;
      })
      .addCase(fetchLast90DaysPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTodayPurchaseSummary.fulfilled, (state, action) => {
        state.todaySummary = action.payload;
      });
  }
});

export default purchaseSlice.reducer;