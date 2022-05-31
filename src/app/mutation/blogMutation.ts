import { blogAPI } from "app/api/blog";
import { BlogPayload } from "app/model";

export const updateOneBLog = async (payload: BlogPayload) => {
  try {
    const response = await blogAPI.updateOneBlog(payload);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to update blog");
    throw Error("Failed to update blog");
  }
};

export const deleteOneBlog = async (id: string) => {
  try {
    const response = await blogAPI.deleteOneBlog(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to delete blog");
    throw Error("Failed to delete blog");
  }
};

export const acceptOneBlog = async (id: string) => {
  try {
    const response = await blogAPI.acceptOneBlog(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to accept blog");
    throw Error("Failed to accept blog");
  }
};

export const denyOneBlog = async (id: string) => {
  try {
    const response = await blogAPI.denyOneBlog(id);
    if (response.succces) {
      return response.data;
    }
  } catch (error) {
    console.log("Failed to denie blog");
    throw Error("Failed to denie blog");
  }
};
