import { roomAPI } from "app/api/room";
import { Room } from "app/model";

export const getRoomsofApartmentQuery = async ({
  queryKey,
}): Promise<Array<Room>> => {
  try {
    const [_, id] = queryKey;

    if (!id) return;
    const response = await roomAPI.fetchAllRoomsOfApartment(id);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch rooms of apartments");
    throw Error("Failed to fetch rooms of apartments");
  }
};
