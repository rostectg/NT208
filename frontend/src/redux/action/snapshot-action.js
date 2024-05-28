import { createAsyncThunk } from "@reduxjs/toolkit";
import { listSnapshotVersionsApi } from "../../apis/listSnapshotVersionsApi";
import { doArchiveApi } from "../../apis/doArchive";
import { isArchivedApi } from "../../apis/isArchivedApi";

export const getListSnapshots = createAsyncThunk("snapshot/getlist",
  async (url, { isRejectedWithValue }) => {
    try {
      const listSnapshot = await listSnapshotVersionsApi.get(url)
      return listSnapshot.data.snapshot_list
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })

export const doArchive = createAsyncThunk("snapshot/archiving",
  async (url, { isRejectedWithValue }) => {
    try {
      await doArchiveApi.get(url)
      return "ARCHIVING"
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })

export const checkArchive = createAsyncThunk("snapshot/isArchived",
  async (url, { isRejectedWithValue }) => {
    try {
      const archived = await isArchivedApi.get(url)
      return archived.data.status === "archived"
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })
