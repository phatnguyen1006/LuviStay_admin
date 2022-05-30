import { blogAPI } from "app/api/blog";
import { Blog } from "app/model";

export const getAllBlog = async (
  key,
  page?: number
): Promise<Array<Blog>> => {
  try {
    const response = await blogAPI.fetchAllBlog(page ? page : null);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch all blog");
    throw Error("Failed to fetch all blog");
  }
};

export const getComfirmedBlog = async (
  key,
  page?: number
): Promise<Array<Blog>> => {
  try {
    const response = await blogAPI.fetchConfirmedBlog(page ? page : null);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch confirmed blog");
    throw Error("Failed to fetch confirmed blog");
  }
};

export const getPendingBlog = async (
  key,
  page?: number
): Promise<Array<Blog>> => {
  console.log("Query Pending Blog");
  try {
    const response = await blogAPI.fetchPendingBlog(page ? page : null);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch pending blog");
    throw Error("Failed to fetch pending blog");
  }
};
