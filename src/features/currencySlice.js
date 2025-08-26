import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRates = createAsyncThunk(
  "currency/fetchRates",
  async (base = "USD") => {
    const res = await axios.get(`https://api.frankfurter.app/latest?from=${base}`);
    return res.data; // has { rates, base, date }
  }
);

export const fetchHistory = createAsyncThunk(
  "currency/fetchHistory",
  async ({ base, target }) => {
    const end = new Date().toISOString().split("T")[0]; // today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    const start = startDate.toISOString().split("T")[0];

    const res = await fetch(
      `https://api.frankfurter.app/${start}..${end}?from=${base}&to=${target}`
    );
    return res.json();
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    base: "USD",
    rates: {},
    history: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setBase: (state, action) => {
      state.base = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rates = action.payload.rates;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload.rates;
      })
      .addCase(fetchRates.rejected, (state) => {
        state.status = "failed";
      });
  },
});


export const { setBase } = currencySlice.actions;
export default currencySlice.reducer;


