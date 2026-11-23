
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchMedicalRecords = createAsyncThunk(
  "medicalRecords/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/medical-records");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch medical records"
      );
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: "medicalRecords",
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchMedicalRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default medicalRecordsSlice.reducer;
