import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { adminAuthApi } from "app/api/adminAuth";
import { AppThunk } from "app/redux/store";
import { COOKIE_USER } from "app/constants";
import { AdminModel } from "app/model/Admin";
import { getCookie, removeCookie, setCookie } from "app/utils/cookie";
import {
  ApartmentData,
  IApartmentPayload,
  IApartmentResponsePayload,
} from "./types";
import { Apartment } from "app/model";
import { apartmentAPI } from "app/api/apartment";

const initialState: ApartmentData = {
  apartments: [],
};

export const fetchApartmentList =
  (
    // apartmentPayload: IApartmentPayload,
    callback?: VoidFunction,
    onError?: VoidFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response =
        (await apartmentAPI.fetchAllApartment()) as IApartmentResponsePayload;
      if (response) {
        dispatch(fetchAllApartmentSuccess(response));
        callback && callback();
      } else {
        onError && onError();
      }
    } catch (error) {
      console.log("Fetch Apartment Error", error);
    }
  };

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    fetchAllApartmentSuccess: (
      state: ApartmentData,
      action: PayloadAction<IApartmentResponsePayload>
    ) => {
      if (action.payload.data) {
        state.apartments = action.payload.data;
      }
    },
  },
});

export const { fetchAllApartmentSuccess } = apartmentSlice.actions;

export default apartmentSlice.reducer;
