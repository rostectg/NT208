import { axiosInstance } from "../api-config";

export const removeTagsApi = {
  post(data) {
    return axiosInstance.post('/api/bookmark/remove_tags', { url: data.url, tags: data.tags });
  }
}
