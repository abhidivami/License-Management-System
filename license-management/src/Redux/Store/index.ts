// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../Slice/LicenseForm/index';
import Analytics from '../Slice/Analyics/index';

export const store = configureStore({
  reducer: {
    form: formReducer,
    analytics: Analytics,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;