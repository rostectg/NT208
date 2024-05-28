import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../apis/loginApi";
import { registerApi } from "../../apis/registerApi";
import { logoutApi } from "../../apis/logoutApi";

export const logIn = createAsyncThunk("user/login",
  async (data, { isRejectedWithValue }) => {
    try {
      const userLogIn = await loginApi.post(data);
      return userLogIn.data.success
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const register = createAsyncThunk("user/register",
  async (data, { isRejectedWithValue }) => {
    try {
      const userRegister = await registerApi.post(data);
      console.log(userRegister);
      return userRegister.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)

export const logOut = createAsyncThunk("user/logout",
  async ({ isRejectedWithValue }) => {
    try {
      const logOutResponse = await logoutApi.post();
      return logOutResponse.data
    } catch (error) {
      return isRejectedWithValue(error.message)
    }
  }
)