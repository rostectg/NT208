import { configureStore } from '@reduxjs/toolkit'
import snapshotReducer from './slice/snapshot-slice';
import userReducer from './slice/user-slice';

export const store = configureStore({
  reducer: {
    snapshot: snapshotReducer,
    user: userReducer
  },
})