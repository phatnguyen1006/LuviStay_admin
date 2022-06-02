import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, ApartmentPayload, DataResponse, Room } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";

export const apartmentAPI = {
  fetchAllApartment: async (
    page?: number
  ): Promise<DataResponse<Array<Apartment>>> => {
    let url = "";
    if (page) url = `${ADMIN_ENDPOINT.ALL_APARTMENT}?page=${page}`;
    else url = ADMIN_ENDPOINT.ALL_APARTMENT;
    return await axiosClient.get(url);
  },
  fetchOneApartmentByID: async (
    id: string
  ): Promise<DataResponse<Apartment>> => {
    const url = `${ADMIN_ENDPOINT.ONE_APARTMENT}/${id}`;
    return await axiosClient.get(url);
  },
  updateOneApartment: async (payload: {
    apartmentID: string;
    apartmentData: ApartmentPayload;
  }): Promise<DataResponse<Apartment>> => {
    const url = `${ADMIN_ENDPOINT.UPDATE_APARTMENT}`;
    return await axiosClient.put(url, payload);
  },
  deleteOneApartment: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DELETE_APARTMENT}`;
    return await axiosClient.put(url, { apartmentId: id });
  },
  activeOneApartment: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.ACTIVE_APARTMENT}`;
    return await axiosClient.put(url, { apartmentId: id });
  },
  acceptOneApartment: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.ACCEPT_APARTMENT}`;
    return await axiosClient.put(url, { apartmentId: id });
  },
  denyOneApartment: async (id?: string): Promise<DataResponse<null>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DENY_APARTMENT}?apartmentId=${id}`;
    return await axiosClient.delete(url);
  },
};
