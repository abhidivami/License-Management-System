// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../Slice/LicenseForm/index';
import Analytics from '../Slice/Analyics/index';
import searchSlice from '../Slice/Search/index';
import notificationSlice from '../Slice/notification';

export const store = configureStore({
  reducer: {
    form: formReducer,
    analytics: Analytics,
    search: searchSlice,
    notification:notificationSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;