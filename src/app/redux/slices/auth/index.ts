import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminAuthApi } from "app/api/adminAuth";
import { AppThunk } from "app/redux/store";
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
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state: IAdminAuth, action: PayloadAction<ISignInResponsePayload>) => {},
    reLogin: () => {},
    signOut: () => {},
  },
});

export const { signInSuccess, signOut, reLogin } = authSlice.actions;

export default authSlice.reducer;
