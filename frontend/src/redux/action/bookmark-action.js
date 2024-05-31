import { createAsyncThunk } from "@reduxjs/toolkit";
import { bookmarkApi } from "../../apis";

export const addTags = createAsyncThunk("bookmark/addtags",
  async (data, { isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.addTagsApi.post(data)
      return response.data.success
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  })

export const newBookmark = createAsyncThunk("bookmark/newbookmark",
  async (url, { isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.newBookmarkApi.post(url)
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const recentViewed = createAsyncThunk("bookmark/recentViewed",
  async () => {
    const response = await bookmarkApi.recentViewedApi.post()
    return response.data.recent_urls
  }
)

export const removeBookmark = createAsyncThunk("bookmark/removebookmark",
  async (url, { isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.removeBookmarkApi.post(url)
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const removeTags = createAsyncThunk("bookmark/removetag",
  async (data, { isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.removeTagsApi.post(data)
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const listAllBookmarks = createAsyncThunk("bookmark/listall",
  async ({ isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.listAllBookmarkApi.post()
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const listAllByTag = createAsyncThunk("bookmark/listallbytag",
  async (tag, { isRejectedWithValue }) => {
    try {
      const response = await bookmarkApi.listAllByTagApi.post(tag)
      return response.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)