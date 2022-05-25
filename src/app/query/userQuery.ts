import { userAPI } from "app/api/user";
import { User } from "app/model";

export const getUserQuery = async (
  key,
  page?: number
): Promise<Array<User>> => {
  try {
    const response = await userAPI.fetchAllUser(page ? page : null);
    return response.data;
  }
  catch (error) {
    console.log("Failed to fetch users");
  }
};
