import { createContext, useEffect, useReducer } from 'react';
import { STORAGE_KEY } from '~/constants';

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

import { globalReducer, initialState } from './reducer';

export const GlobalContext = createContext(null);
export const GlobalDispatch = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const setInitialData = (values) => {
    dispatch({ type: SET_INITIAL_DATA, payload: values });
  };
  const setActiveCategory = (values) => {
    dispatch({ type: SET_ACTIVE_CATEGORY, payload: values });
  };
  const setBiodata = (values) => {
    dispatch({ type: SET_BIODATA, payload: values });
  };
  const setBiodataError = (error) => {
    dispatch({ type: SET_BIODATA_ERROR, payload: error });
  };
  const setAnswers = ({ name, index, value }) => {
    dispatch({ type: SET_ANSWERS, payload: { name, index, value } });
  };
  const setScore = ({ name, value }) => {
    dispatch({ type: SET_SCORE, payload: { name, value } });
  };
  const setTotalScore = (value) => {
    dispatch({ type: SET_TOTAL_SCORE, payload: value });
  };
  const setGrade = (value) => {
    dispatch({ type: SET_GRADE, payload: value });
  };

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      setInitialData(JSON.parse(data))
    }
  }, []) // eslint-disable-line

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatch.Provider
        value={{
          setActiveCategory,
          setBiodata,
          setBiodataError,
          setAnswers,
          setScore,
          setTotalScore,
          setGrade,
          dispatch,
        }}
      >
        {children}
      </GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
};
