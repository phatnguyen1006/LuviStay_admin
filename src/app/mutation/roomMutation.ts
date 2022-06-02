import { roomAPI } from "app/api/room";
import { RoomPayload } from "app/model";

export const updateOneRoomMutation = async (payload: RoomPayload) => {
  try {
    const response = await roomAPI.updateOneRoom(payload);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update room");
    throw Error("Failed to update room");
  }
};

export const deleteOneRoomMutation = async (id: string) => {
  try {
    const response = await roomAPI.deleteOneRoom(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to delete room");
    throw Error("Failed to delete room");
  }
};
