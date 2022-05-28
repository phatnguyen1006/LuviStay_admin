import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, DataResponse } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";
// import { IResIdea, IIdea, IStatus, ICountIdea } from "pages/admin/detail-popup/types";
// import { LIMIT_IDEAS } from "app/constants";

// export interface IApartment {}

export const apartmentAPI = {
  fetchAllApartment: async (page?: number): Promise<DataResponse<Array<Apartment>>> => {
    let url = "";
    if (page) url = `${ADMIN_ENDPOINT.ALL_APARTMENT}?page=${page}`;
    else url = ADMIN_ENDPOINT.ALL_APARTMENT;
    return await axiosClient.get(url);
  },
};
