import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, DataResponse } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";

export const apartmentAPI = {
  fetchAllApartment: async (page?: number): Promise<DataResponse<Array<Apartment>>> => {
    let url = "";
    if (page) url = `${ADMIN_ENDPOINT.ALL_APARTMENT}?page=${page}`;
    else url = ADMIN_ENDPOINT.ALL_APARTMENT;
    return await axiosClient.get(url);
  },
  deleteOneBlog: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DELETE_APARTMENT}`;
    return await axiosClient.put(url, { apartmentId: id });
  },
  acceptOneBlog: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.ACCEPT_APARTMENT}`;
    return await axiosClient.put(url, { apartmentId: id });
  },
  denyOneBlog: async (id?: string): Promise<DataResponse<null>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DENY_APARTMENT}?apartmentId=${id}`;
    return await axiosClient.delete(url);
  },
};
