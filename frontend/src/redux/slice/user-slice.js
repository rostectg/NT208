import { createSlice } from "@reduxjs/toolkit"
import { userAction } from "../action"

const initialState = {
  auth: false,
  status: "INIT",
  error: {
    message: ""
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userAction.logIn.pending, (state) => {
      state.auth = false;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(userAction.logIn.fulfilled, (state, action) => {
      state.error = action.payload ? {} : { message: "Log in failed" };
      state.status = action.payload ? "SUCCESS" : "ERROR";
      state.auth = action.payload;
    })
    builder.addCase(userAction.logIn.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })


    builder.addCase(userAction.register.pending, (state) => {
      state.auth = false;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(userAction.register.fulfilled, (state, action) => {
      state.error = action.payload ? {} : { message: "Register failed" };
      state.status = action.payload ? "SUCCESS" : "ERROR";
      state.auth = action.payload;
    })
    builder.addCase(userAction.register.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })

    builder.addCase(userAction.logOut.pending, (state) => {
      state.auth = true;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(userAction.logOut.fulfilled, (state, action) => {
      state.error = action.payload ? {} : { message: action.payload.msg };
      state.status = action.payload ? "SUCCESS" : "ERROR";
      state.auth = action.payload ? false : true;
    })
    builder.addCase(userAction.logOut.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
      state.auth = true;
    })

  }
})

export default userSlice.reducer