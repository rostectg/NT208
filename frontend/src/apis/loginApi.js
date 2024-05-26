import { axiosInstance } from "./api-config";

export const loginApi = {
  post(username, password) {
    const url = `/api/auth/login`;
    return axiosInstance.post(url, {
      username: username,
      password: password
    });
  }
}
const response = await loginApi.post("alice", "p@ssw0rd")
console.log("response", response)