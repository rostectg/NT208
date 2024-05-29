import { axiosInstance } from "../api-config";

export const listAllBookmarkApi = {
  post() {
    return axiosInstance.post('/api/bookmark/list');
  }
}
