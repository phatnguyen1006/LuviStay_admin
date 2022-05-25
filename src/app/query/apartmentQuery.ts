import { apartmentAPI } from "app/api/apartment";
import { Apartment } from "app/model";

export const getApartmentQuery = async (
  key,
  page?: number
): Promise<Array<Apartment>> => {
  const response = await apartmentAPI.fetchAllApartment(page ? page : null);
  return response.data;
};
