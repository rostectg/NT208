import { axiosInstance } from "./api-config";

export const registerApi = {
  post(data) {
    const url = `/api/register/do_register`;
    return axiosInstance.post(url, data);
  }
}