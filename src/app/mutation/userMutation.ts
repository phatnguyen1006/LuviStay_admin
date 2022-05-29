import { userAPI } from "app/api/user";
import { UserPayload } from "app/model";

export const createNewUser = async (payload: UserPayload) => {
  try {
    const response = await userAPI.createNewUser(payload);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to create new user");
    throw Error("Failed to create user");
  }
};

export const updateOneUser = async (payload: UserPayload) => {
  try {
    const response = await userAPI.updateOneUser(payload);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update user: ", error);
    throw Error("Failed to update user");
  }
};

export const deleteOneUser = async (id: string) => {
  try {
    const response = await userAPI.deleteOneUser(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to delete user");
    throw Error("Failed to delete user");
  }
};