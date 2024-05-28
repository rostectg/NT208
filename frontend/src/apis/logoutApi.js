import { axiosInstance } from "./api-config";

export const logoutApi = {
  post() {
    const url = `/api/auth/logout`;
    return axiosInstance.post(url);
  }
}