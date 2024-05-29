import { axiosInstance } from "../api-config";

export const newBookmarkApi = {
  post(url) {
    return axiosInstance.post('/api/bookmark/add', { url: url });
  }
}