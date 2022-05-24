import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { STORAGE_KEY } from '~/constants/storageKeys';

// REDUCERS
import step from './slices/stepSlice';
import intro from './slices/introSlice';
import biodata from './slices/biodataSlice';
import proficiency from './slices/proficiencySlice';

const persistConfig = {
  key: STORAGE_KEY,
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  step,
  intro,
  biodata,
  proficiency,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
