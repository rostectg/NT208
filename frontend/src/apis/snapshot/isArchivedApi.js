import { axiosInstance } from "../api-config";

export const isArchivedApi = {
  get(params) {
    const url = `/api/archive/is_archived?url=${params}`;
    return axiosInstance.get(url)
  }
}