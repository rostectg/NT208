import { configureStore } from '@reduxjs/toolkit'
import snapshotReducer from './slice';

export const store = configureStore({
  reducer: {
    snapshot: snapshotReducer
  },
})