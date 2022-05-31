import { apartmentAPI } from "app/api/apartment";

export const acceptOneApartment = async (id: string) => {
  try {
    const response = await apartmentAPI.acceptOneBlog(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to accept apartment");
    throw Error("Failed to accept apartment");
  }
};

export const denyOneApartment = async (id: string) => {
  try {
    const response = await apartmentAPI.denyOneBlog(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to deny apartment");
    throw Error("Failed to deny apartment");
  }
};
