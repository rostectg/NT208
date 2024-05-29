import { axiosInstance } from "../api-config";

export const listAllByTagApi = {
  post(tag) {
    return axiosInstance.post('/api/bookmark/list_by_tag', { tag: tag });
  }
}
