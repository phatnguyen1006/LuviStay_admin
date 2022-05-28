import { userAPI } from "app/api/user";
import { UserPayload } from "app/model";

export const createNewUser = async (payload: UserPayload) => {
  try {
    const response = await userAPI.createNewUser(payload);
    return response.data;
  } catch (error) {
    console.log("Failed to create new user");
  }
};

export const updateOneUser = async (payload: UserPayload) => {
  try {
    const response = await userAPI.updateOneUser(payload);
    return response.data;
  } catch (error) {
    console.log("Failed to create new user");
  }
};

export const deleteOneUser = async (id: string) => {
  try {
    const response = await userAPI.deleteOneUser(id);
    return response.data;
  } catch (error) {
    console.log("Failed to create new user");
  }
};