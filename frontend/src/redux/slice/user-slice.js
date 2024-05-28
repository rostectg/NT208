import { createSlice } from "@reduxjs/toolkit"
import { logIn, logOut, register } from "../action/user-action"

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
    builder.addCase(logIn.pending, (state) => {
      state.auth = false;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.error = action.payload ? {} : { message: action.payload.msg };
      state.status = action.payload ? "SUCCESS" : "ERROR";
      state.auth = action.payload;
    })
    builder.addCase(logIn.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })


    builder.addCase(register.pending, (state) => {
      state.auth = false;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.error = action.payload.success === "true" ? {} : { message: action.payload.msg };
      state.status = action.payload.success === "true" ? "SUCCESS" : "ERROR";
      state.auth = action.payload.success === "true" ? true : false;
    })
    builder.addCase(register.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })

    builder.addCase(logOut.pending, (state) => {
      state.auth = false;
      state.error = {};
      state.status = "PENDING"
    })
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.error = action.payload.success === true ? {} : { message: action.payload.msg };
      state.status = action.payload.success === true ? "SUCCESS" : "ERROR";
      state.auth = action.payload.success === true ? true : false;
    })
    builder.addCase(logOut.rejected, (state) => {
      state.error.message = "Something went wrong";
      state.status = "ERROR"
    })

  }
})

export default userSlice.reducer