import { axiosInstance } from "../api-config";

export const addTagsApi = {
  post(data) {
    return axiosInstance.post('/api/bookmark/add', { url: data.url, tags: data.tags });
  }
}
