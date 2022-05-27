import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  intro: {
    ekspektasi_grade: '',
  },
  intro_error: {},
};

export const introSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    setIntro: (state, { payload }) => {
      state.intro = payload;
    },
    setIntroError: (state, { payload }) => {
      state.intro_error = payload;
    },
  },
});

export const { setIntro, setIntroError } = introSlice.actions;

export default introSlice.reducer;
