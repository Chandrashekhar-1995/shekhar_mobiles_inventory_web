import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../service/apiClient";

export const fetchLast90DaysSales = createAsyncThunk(
  'sales/fetchLast90DaysSales',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/invoice/last-90days-sales");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch sales data");
    }
  }
);

export const fetchTodaySummary = createAsyncThunk(
  'sales/fetchTodaySummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.customFetch("/invoice/today-sales-summary");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch today's summary");
    }
  }
);

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    last90DaysData: [],
    todaySummary: { totalSales: 0, invoiceCount: 0 },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLast90DaysSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLast90DaysSales.fulfilled, (state, action) => {
        state.loading = false;
        state.last90DaysData = action.payload;
      })
      .addCase(fetchLast90DaysSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTodaySummary.fulfilled, (state, action) => {
        state.todaySummary = action.payload;
      });
  }
});

export default salesSlice.reducer;