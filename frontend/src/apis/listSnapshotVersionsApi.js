import { axiosInstance } from "./api-config";

export const listSnapshotVersionsApi = {
  get(params) {
    const url = "/api/archive/list";
    return axiosInstance.get(url, { params });
  }
}