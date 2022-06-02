import axiosClient from "../axiosClient";
import { ResponseStatus } from "app/definitions/Enum";
import { Apartment, DataResponse, Room, RoomPayload } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";

export const roomAPI = {
  fetchAllRoomsOfApartment: async (
    id: string
  ): Promise<DataResponse<Array<Room>>> => {
    const url = `${ADMIN_ENDPOINT.ROOM_OF_APARTMENT}/${id}`;
    return await axiosClient.get(url);
  },
  updateOneRoom: async (payload: RoomPayload): Promise<DataResponse<Room>> => {
    const url = `${ADMIN_ENDPOINT.UPDATE_ROOM}`;
    return await axiosClient.put(url, payload);
  },
  activeOneRoom: async (id: string): Promise<DataResponse<null>> => {
    const url = `${ADMIN_ENDPOINT.ACTIVE_ROOM}`;
    return await axiosClient.put(url, { roomId: id });
  },
  disableOneRoom: async (id: string): Promise<DataResponse<null>> => {
    const url = `${ADMIN_ENDPOINT.DELETE_ROOM}`;
    return await axiosClient.put(url, { roomId: id });
  },
};
