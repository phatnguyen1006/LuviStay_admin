import { apartmentAPI } from "app/api/apartment";
import { ApartmentPayload } from "app/model";

export const updateOneApartmentMutation = async (payload: {
  apartmentID: string;
  apartmentData: ApartmentPayload;
}) => {
  try {
    const response = await apartmentAPI.updateOneApartment(payload);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update apartment");
    throw Error("Failed to update apartment");
  }
};

export const acceptOneApartment = async (id: string) => {
  try {
    const response = await apartmentAPI.acceptOneApartment(id);
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
    const response = await apartmentAPI.denyOneApartment(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to deny apartment");
    throw Error("Failed to deny apartment");
  }
};
