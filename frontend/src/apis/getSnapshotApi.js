import { axiosInstance } from "./api-config";

export const getSnapshotApi = {
  get(params) {
    const url = "/api/archive/view_raw";
    return axiosInstance.get(url, { params });
  }
}