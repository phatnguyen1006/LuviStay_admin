import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminAuthApi } from "app/api/adminAuth";
import { AppThunk } from "app/redux/store";
import { COOKIE_USER } from "app/constants";
import { AdminModel } from "app/model/Admin";
import { getCookie, removeCookie, setCookie } from "app/utils/cookie";
import { ISignInPayload, ISignInResponsePayload, IAdminAuth } from "./types";

const initialState: IAdminAuth = {
  isLoggedIn: false,
};

export const signIn = (ISignInPayload: ISignInPayload, callback: VoidFunction, onErr:VoidFunction): AppThunk => async (dispatch) => {
    try {
        const response = await adminAuthApi.signIn(ISignInPayload) as ISignInResponsePayload;
        if (response) {
            dispatch(signInSuccess(response));
            callback();
        }
        else {
            onErr();
        }
    } catch (error) {
        console.log("signInError", error);
    }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state: IAdminAuth, action: PayloadAction<ISignInResponsePayload>) => {
      const user = {} as AdminModel;
			user.token = action.payload.token;
			setCookie(COOKIE_USER,JSON.stringify(user));
			state.isLoggedIn = true;
    },
    reLogin: (state: IAdminAuth) => {
      try {
        const user = JSON.parse(getCookie(COOKIE_USER)) as AdminModel;

        if (user) {
          state.isLoggedIn = true;
        }
      } catch (error) {
        console.log("reLogin error: ", error);
      }
    },
    signOut: (state: IAdminAuth) => {
      state.isLoggedIn = false;
      removeCookie(COOKIE_USER);
    },
  },
});

export const { signInSuccess, signOut, reLogin } = authSlice.actions;

export default authSlice.reducer;
