import { createSlice } from '@reduxjs/toolkit'
import { checkArchive, doArchive, getListSnapshots} from './action'

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
    builder.addCase(getListSnapshots.pending, (state) => {
      state.isArchived = true
      state.status = "PENDING"
      state.error = {}
    })
    builder.addCase(getListSnapshots.fulfilled, (state, action) => {
      state.isArchived = true
      state.listSnapshot = action.payload
      state.status = "SUCCESS"
      state.error = {}
    })
    builder.addCase(getListSnapshots.rejected, (state, action) => {
      state.error.message = action.payload
      state.status = 'ERROR'
    })

    builder.addCase(doArchive.pending, (state) => {
      state.error = {}
      state.isArchived = false
      state.status = "PENDING"
    })
    builder.addCase(doArchive.fulfilled, (state) => {
      state.error = {}
      state.status = "SUCCESS"
      state.isArchived = false
    })
    builder.addCase(doArchive.rejected, (state, action) => {
      state.error.message = action.payload
      state.status = "ERROR"
    })

    builder.addCase(checkArchive.pending, (state) => {
      state.error = {}
      state.isArchived = false
      state.status = "PENDING"
    })
    builder.addCase(checkArchive.fulfilled, (state, action) => {
      state.error = {}
      state.isArchived = action.payload
      state.status = "SUCCESS"
    })
    builder.addCase(checkArchive.rejected, (state, action) => {
      state.error.message = "Something went wrong"
      state.status = "ERROR"
    })
  }
})


export default archivedSlice.reducer