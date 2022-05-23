import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, ApartmentData, DataResponse } from "app/model";
// import { IResIdea, IIdea, IStatus, ICountIdea } from "pages/admin/detail-popup/types";
// import { LIMIT_IDEAS } from "app/constants";

// export interface IApartment {}

export const apartmentAPI = {
  fetchAllApartment: async (page?: number): Promise<DataResponse<Array<Apartment>>> => {
    let url = "";
    if (page) url = `/apartment/all?page=${page}`;
    else url = "/apartment/all";
    return await axiosClient.get(url);
  },
};
