import { configureStore } from '@reduxjs/toolkit'
import snapshotReducer from './slice/snapshot-slice';
import userReducer from './slice/user-slice';
import { bookmarkSlice } from './slice/bookmark-slice';

export const store = configureStore({
  reducer: {
    snapshot: snapshotReducer,
    user: userReducer,
    bookmark: bookmarkSlice
  },
})