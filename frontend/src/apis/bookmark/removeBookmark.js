import { axiosInstance } from './../api-config';

export const removeBookmarkApi = {
  post(url) {
    return axiosInstance.post('/api/bookmark/remove', { url: url });

  }
}