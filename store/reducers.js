import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { STORAGE_KEY } from '~/constants/storageKeys';
import step from './slices/stepSlice';
import intro from './slices/introSlice';
import biodata from './slices/biodataSlice';
import proficiency from './slices/proficiencySlice';
import additional from './slices/additionalSlice';

const rootReducer = combineReducers({
  step,
  intro,
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
