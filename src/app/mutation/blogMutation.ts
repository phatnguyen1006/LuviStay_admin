import { blogAPI } from "app/api/blog";

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
