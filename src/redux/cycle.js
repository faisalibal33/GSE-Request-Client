import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cycle: false,
};

const cycleSlice = createSlice({
  name: "cycle",
  initialState,
  reducers: {
    cycleTrue(state) {
      state.cycle = true;
    },
    cycleFalse(state) {
      state.cycle = false;
    },
  },
});

export const { cycleTrue, cycleFalse } = cycleSlice.actions;

export default cycleSlice.reducer;
