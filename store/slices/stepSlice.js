import { createSlice } from '@reduxjs/toolkit';
import { STEPS } from '~/constants/steps';

const initialState = {
  current: STEPS[0],
  latest: STEPS[0],
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.current = payload;
    },
    setLatestStep: (state, { payload }) => {
      if (payload.step > state.latest.step) {
        state.latest = payload;
      }
    },
  },
});

export const { setCurrentStep, setLatestStep } = stepSlice.actions;

export default stepSlice.reducer;
