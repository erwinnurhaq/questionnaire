import {
  SET_INITIAL_DATA,
  SET_ACTIVE_STEP,
  SET_GRADE_EXPECTATION,
  SET_BIODATA,
  SET_BIODATA_ERROR,
  SET_ANSWERS,
  SET_SCORE,
  SET_TOTAL_SCORE,
  SET_GRADE,
} from './actionType';

export const initialState = {
  step: 0,
  ekspektasi_grade: '',
  biodata: {
    nama: '',
    email: '',
    tingkat_sekolah: '',
    mata_pelajaran: '',
    pengalaman_mengajar: '',
    pengalaman_digital: '',
  },
  biodata_error: {},
  questions: {},
  answers: {},
  score: {},
  total_score: 0,
  grade: '',
};

export const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INITIAL_DATA: {
      return { ...state, ...payload };
    }
    case SET_ACTIVE_STEP: {
      return { ...state, active_step: payload };
    }
    case SET_GRADE_EXPECTATION: {
      return { ...state, ekspektasi_grade: payload };
    }
    case SET_BIODATA: {
      return { ...state, biodata: payload };
    }
    case SET_BIODATA_ERROR: {
      return { ...state, biodata_error: payload };
    }
    case SET_ANSWERS: {
      const answers = [...state.answers[payload.name] || []];
      answers[payload.index] = payload.value;
      return { ...state, answers: { ...state.answers, [payload.name]: answers } };
    }
    case SET_SCORE: {
      return { ...state, score: { ...state.score, [payload.name]: payload.value } };
    }
    case SET_TOTAL_SCORE: {
      return { ...state, total_score: payload };
    }
    case SET_GRADE: {
      return { ...state, grade: payload };
    }
    default: {
      return state;
    }
  }
};
