import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ekspektasi_grade: '',
  ekspektasi_grade_2: '',
};

export const expectationSlice = createSlice({
  name: 'expectation',
  initialState,
  reducers: {
    setExpectation1: (state, { payload }) => {
      state.ekspektasi_grade = payload;
    },
    setExpectation2: (state, { payload }) => {
      state.ekspektasi_grade_2 = payload;
    },
  },
});

export const { setExpectation1, setExpectation2 } = expectationSlice.actions;

export default expectationSlice.reducer;
