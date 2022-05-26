import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { STORAGE_KEY } from '~/constants/storageKeys';
import step from './slices/stepSlice';
import intro from './slices/introSlice';
import biodata from './slices/biodataSlice';
import proficiency from './slices/proficiencySlice';

const rootReducer = combineReducers({
  step,
  intro,
  biodata,
  proficiency,
});

const persistConfig = {
  key: STORAGE_KEY,
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
