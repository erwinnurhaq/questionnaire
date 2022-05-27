import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: {},
};

export const additionalSlice = createSlice({
  name: 'additional',
  initialState,
  reducers: {
    setAdditionalAnswers: (state, { payload }) => {
      const answers = [...(state.answers[payload.additionalNo] || [])];
      answers[payload.questionNo - 1] = payload.value;
      state.answers[payload.additionalNo] = answers;
    },
  },
});

export const { setAdditionalAnswers } = additionalSlice.actions;

export default additionalSlice.reducer;
