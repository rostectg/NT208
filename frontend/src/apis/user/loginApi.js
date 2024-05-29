import { axiosInstance } from "../api-config";

export const loginApi = {
  post(data) {
    const url = '/api/auth/login';
    return axiosInstance.post(url, data);
  }
}