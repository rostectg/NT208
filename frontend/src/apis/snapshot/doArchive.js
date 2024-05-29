import { axiosInstance } from "../api-config";

export const doArchiveApi = {
  get(params) {
    const url = `/api/archive/do_archive?url=${params}`;
    return axiosInstance.get(url);
  }
}