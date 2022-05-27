import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: {},
  score: {},
  total_score: 0,
  grade: '',
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
    setScore: (state, { payload }) => {
      state.score[payload.partNo] = payload.value;
    },
    setTotalScore: (state, { payload }) => {
      state.total_score = payload;
    },
    setGrade: (state, { payload }) => {
      state.grade = payload;
    },
  },
});

export const { setAnswers, setScore, setTotalScore, setGrade } = proficiencySlice.actions;

export default proficiencySlice.reducer;
