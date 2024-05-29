import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../apis";

export const logIn = createAsyncThunk("user/login",
  async (data, { isRejectedWithValue }) => {
    try {
      const userLogIn = await userApi.loginApi.post(data);
      return userLogIn.data.success
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const register = createAsyncThunk("user/register",
  async (data, { isRejectedWithValue }) => {
    try {
      const userRegister = await userApi.registerApi.post(data);
      return userRegister.data.success
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const logOut = createAsyncThunk("user/logout",
  async ({ isRejectedWithValue }) => {
    try {
      const logOutResponse = await userApi.logoutApi.post();
      return logOutResponse.data.success
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)