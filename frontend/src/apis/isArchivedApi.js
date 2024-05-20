import { axiosInstance } from "./api-config";

export const isArchivedApi = {
  get(params) {
    //param = url of website want to check
    const url = "/api/archive/is_archived";
    return axiosInstance.get(url, (params))
  }
}