import axiosClient from "../axiosClient";
// import { ResponseStatus } from "app/definitions/Enum";
import { DataResponse, User } from "app/model";
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
};
