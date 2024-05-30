import { createSlice } from "@reduxjs/toolkit"
import { bookmarkAction } from "../action"

const initialState = {
  recents: [],
  listBookmarks: [],
  status: 'INIT',
  error: {
    message: ''
  }
}

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookmarkAction.recentViewed.pending, (state) => {
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(bookmarkAction.recentViewed.fulfilled, (state, action) => {
      state.error = action.payload.msg ? {} : { message: action.payload.msg };
      state.status = action.payload.success ? "SUCCESS" : "ERROR";
      state.recents.push(action.payload.recent_urls)
    })
    builder.addCase(bookmarkAction.recentViewed.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })
  }
})

export default bookmarkSlice.reducer