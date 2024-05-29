import { axiosInstance } from "../api-config";

export const recentViewedApi = {
  post() {
    return axiosInstance.post('/api/bookmark/recent');
  }
}