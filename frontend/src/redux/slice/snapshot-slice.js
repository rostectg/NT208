import { createSlice } from '@reduxjs/toolkit'
import { snapshotAction } from '../action'

const initialState = {
  isArchived: false,
  listSnapshot: [],
  status: "INIT",
  error: {
    message: ''
  }
}

export const archivedSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(snapshotAction.getListSnapshots.pending, (state) => {
      state.isArchived = true
      state.status = "PENDING"
      state.error = {}
    })
    builder.addCase(snapshotAction.getListSnapshots.fulfilled, (state, action) => {
      state.isArchived = true
      state.listSnapshot = action.payload
      state.status = "SUCCESS"
      state.error = {}
    })
    builder.addCase(snapshotAction.getListSnapshots.rejected, (state, action) => {
      state.error.message = action.payload
      state.status = 'ERROR'
    })

    builder.addCase(snapshotAction.doArchive.pending, (state) => {
      state.error = {}
      state.isArchived = false
      state.status = "PENDING"
    })
    builder.addCase(snapshotAction.doArchive.fulfilled, (state) => {
      state.error = {}
      state.status = "SUCCESS"
      state.isArchived = false
    })
    builder.addCase(snapshotAction.doArchive.rejected, (state, action) => {
      state.error.message = action.payload
      state.status = "ERROR"
    })

    builder.addCase(snapshotAction.checkArchive.pending, (state) => {
      state.error = {}
      state.isArchived = false
      state.status = "PENDING"
    })
    builder.addCase(snapshotAction.checkArchive.fulfilled, (state, action) => {
      state.error = {}
      state.isArchived = action.payload
      state.status = "SUCCESS"
    })
    builder.addCase(snapshotAction.checkArchive.rejected, (state, action) => {
      state.error.message = "Something went wrong"
      state.status = "ERROR"
    })
  }
})


export default archivedSlice.reducer