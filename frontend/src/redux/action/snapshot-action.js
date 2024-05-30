import { createAsyncThunk } from "@reduxjs/toolkit";
import { snapshotApi } from "../../apis";

export const getListSnapshots = createAsyncThunk("snapshot/getlist",
  async (url, { isRejectedWithValue }) => {
    try {
      const listSnapshot = await snapshotApi.listSnapshotVersionsApi.get(url)
      return listSnapshot.data.snapshot_list
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })

export const doArchive = createAsyncThunk("snapshot/archiving",
  async (url, { isRejectedWithValue }) => {
    try {
      const response = await snapshotApi.doArchiveApi.get(url)
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })

export const checkArchive = createAsyncThunk("snapshot/isArchived",
  async (url, { isRejectedWithValue }) => {
    try {
      const archived = await snapshotApi.isArchivedApi.get(url)
      return archived.data.status === "archived" ? true : false
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })
