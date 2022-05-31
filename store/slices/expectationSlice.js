import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ekspektasi_grade_1: undefined,
  ekspektasi_grade_2: undefined,
};

export const expectationSlice = createSlice({
  name: 'expectation',
  initialState,
  reducers: {
    setExpectation1: (state, { payload }) => {
      state.ekspektasi_grade_1 = payload;
    },
    setExpectation2: (state, { payload }) => {
      state.ekspektasi_grade_2 = payload;
    },
  },
});

export const { setExpectation1, setExpectation2 } = expectationSlice.actions;

export default expectationSlice.reducer;
