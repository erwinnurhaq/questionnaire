import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { STORAGE_KEY } from '~/constants/storageKeys';
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
  additional
});

const persistConfig = {
  key: STORAGE_KEY,
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
