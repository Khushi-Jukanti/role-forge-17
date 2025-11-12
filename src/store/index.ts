import { configureStore } from '@reduxjs/toolkit';
import childrenReducer from './slices/childrenSlice';
import assessmentsReducer from './slices/assessmentsSlice';
import resultsReducer from './slices/resultSlice';

export const store = configureStore({
  reducer: {
    children: childrenReducer,
    assessments: assessmentsReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
