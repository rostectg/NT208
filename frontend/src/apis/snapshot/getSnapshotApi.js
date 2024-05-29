import { axiosInstance } from "../api-config";

export const getSnapshotApi = {
  get(params) {
    const url = `/api/archive/view_raw?snapshot_id=${params}`;
    return axiosInstance.get(url);
  }
}