import { ResponseStatus } from "app/definitions/Enum";
import { ISignInPayload, ISignInResponsePayload } from "app/redux/slices/auth/types";
import axiosClient from "../axiosClient";
import { ADMIN_ENDPOINT } from "../endpoint";
// import { callAPI } from "../fakeApi";

export const adminAuthApi = {
  signIn: async (payload: ISignInPayload): Promise<ISignInResponsePayload> => {
    const endpoint = ADMIN_ENDPOINT.ADMIN_SIGNIN;
    return await axiosClient.post(endpoint, payload);
  },
};
