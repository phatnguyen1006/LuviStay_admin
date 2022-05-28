import axiosClient from "../axiosClient";
// import { ResponseStatus } from "app/definitions/Enum";
import { DataResponse, User, UserPayload } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";
// import { IResIdea, IIdea, IStatus, ICountIdea } from "pages/admin/detail-popup/types";
// import { LIMIT_IDEAS } from "app/constants";

// export interface IApartment {}

export const userAPI = {
  fetchAllUser: async (page?: number): Promise<DataResponse<Array<User>>> => {
    let url = "";
    if (page) url = `${ADMIN_ENDPOINT.ALL_USER}?page=${page}`;
    else url = ADMIN_ENDPOINT.ALL_USER;
    return await axiosClient.get(url);
  },
  fetchOneUser: async (id: string): Promise<DataResponse<User>> => {
    const url = `${ADMIN_ENDPOINT.ONE_USER}/${id}`;
    return await axiosClient.get(url);
  },
  createNewUser: async (
    payload: UserPayload
  ): Promise<DataResponse<string>> => {
    const url = ADMIN_ENDPOINT.NEW_USER;
    return await axiosClient.post(url, payload);
  },
  updateOneUser: async (payload: UserPayload): Promise<DataResponse<any>> => {
    const url = ADMIN_ENDPOINT.UPDATE_USER;
    return await axiosClient.put(url, payload);
  },
  deleteOneUser: async (id: string): Promise<DataResponse<any>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DELETE_USER}/${id}`;
    return await axiosClient.delete(url);
  },
};
