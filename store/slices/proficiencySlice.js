import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: {},
  scores: {},
};

export const proficiencySlice = createSlice({
  name: 'proficiency',
  initialState,
  reducers: {
    setAnswers: (state, { payload }) => {
      const answers = [...(state.answers[payload.partNo] || [])];
      answers[payload.questionNo - 1] = payload.value;
      state.answers[payload.partNo] = answers;
    },
    setScores: (state, { payload }) => {
      state.scores = payload;
    },
  },
});

export const { setAnswers, setScores } = proficiencySlice.actions;

export default proficiencySlice.reducer;
