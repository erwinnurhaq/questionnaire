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
      answers[payload.questionNo] = payload.value;
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
    setInitialProficiency: (state, { payload }) => {
      state.answers = payload.answers
      state.score = payload.score
      state.total_score = payload.total_score
      state.grade = payload.grade
    }
  },
});

export const { setAnswers, setScore, setTotalScore, setGrade, setInitialProficiency } = proficiencySlice.actions;

export default proficiencySlice.reducer;
