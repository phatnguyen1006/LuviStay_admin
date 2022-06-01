import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, DataResponse, Room } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";

export const apartmentAPI = {
  fetchAllApartment: async (page?: number): Promise<DataResponse<Array<Apartment>>> => {
    let url = "";
    if (page) url = `${ADMIN_ENDPOINT.ALL_APARTMENT}?page=${page}`;
    else url = ADMIN_ENDPOINT.ALL_APARTMENT;
    return await axiosClient.get(url);
  },
  fetchOneApartmentByID: async (id: string): Promise<DataResponse<Apartment>> => {
    const url = `${ADMIN_ENDPOINT.ONE_APARTMENT}/${id}`;
    return await axiosClient.get(url);
  },
  fetchAllRoomsOfApartment: async (id: string): Promise<DataResponse<Array<Room>>> => {
    const url = `${ADMIN_ENDPOINT.ROOM_OF_APARTMENT}/${id}`;
    return await axiosClient.get(url);
  },
  deleteOneApartment: async (id?: string): Promise<DataResponse<Apartment>> => {
    if (!id) return;
    const url = `${ADMIN_ENDPOINT.DELETE_APARTMENT}`;
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
