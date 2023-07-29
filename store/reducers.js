import { combineReducers } from '@reduxjs/toolkit';

import step from './slices/stepSlice';
import expectation from './slices/expectationSlice';
import biodata from './slices/biodataSlice';
import proficiency from './slices/proficiencySlice';
import additional from './slices/additionalSlice';

const rootReducer = combineReducers({
  step,
  expectation,
  biodata,
  proficiency,
  additional,
});

export default rootReducer;
