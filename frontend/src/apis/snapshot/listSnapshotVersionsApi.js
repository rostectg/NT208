import { axiosInstance } from "../api-config";

export const listSnapshotVersionsApi = {
  get(params) {
    const url = `/api/archive/list?url=${params}`;
    return axiosInstance.get(url);
  }
}