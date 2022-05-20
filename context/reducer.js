import {
  SET_INITIAL_DATA,
  SET_ACTIVE_CATEGORY,
  SET_BIODATA,
  SET_BIODATA_ERROR,
  SET_ANSWERS,
  SET_SCORE,
  SET_TOTAL_SCORE,
  SET_GRADE,
} from './actionType';

export const initialState = {
  active_category: 0,
  biodata: {
    nama: '',
    email: '',
    tingkatan_pengajaran: '',
    mata_pelajaran: '',
    mata_pelajaran_lainnya: '',
    pengalaman_mengajar: '',
  },
  biodata_error: {},
  questions: {
    PROFICIENCY_1: [],
    PROFICIENCY_2: [],
    PROFICIENCY_3: [],
    PROFICIENCY_4: [],
    PROFICIENCY_5: [],
    PROFICIENCY_6: [],
  },
  answers: {
    PROFICIENCY_1: [],
    PROFICIENCY_2: [],
    PROFICIENCY_3: [],
    PROFICIENCY_4: [],
    PROFICIENCY_5: [],
    PROFICIENCY_6: [],
  },
  score: {
    PROFICIENCY_1: 0,
    PROFICIENCY_2: 0,
    PROFICIENCY_3: 0,
    PROFICIENCY_4: 0,
    PROFICIENCY_5: 0,
    PROFICIENCY_6: 0,
  },
  total_score: 0,
  grade: '',
};

export const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INITIAL_DATA: {
      return { ...state, ...payload };
    }
    case SET_ACTIVE_CATEGORY: {
      return { ...state, active_category: payload };
    }
    case SET_BIODATA: {
      return { ...state, biodata: payload };
    }
    case SET_BIODATA_ERROR: {
      return { ...state, biodata_error: payload };
    }
    case SET_ANSWERS: {
      const answers = [...state.answers[payload.name]];
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
