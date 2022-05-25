import { apartmentAPI } from "app/api/apartment";
import { Apartment } from "app/model";

export const getApartmentQuery = async (
  key,
  page?: number
): Promise<Array<Apartment>> => {
  try {
    const response = await apartmentAPI.fetchAllApartment(page ? page : null);
    return response.data;
  }
  catch (error) {
    console.log("Failed to fetch apartments");
  }
};
