import axiosClient from "../axiosClient";
import { Blog, BlogPayload, DataResponse } from "app/model";
import { ADMIN_ENDPOINT } from "../endpoint";

export const blogAPI = {
    fetchAllBlog: async (page?: number): Promise<DataResponse<Array<Blog>>> => {
      let url = "";
      if (page) url = `${ADMIN_ENDPOINT.ALL_BLOG}?page=${page}`;
      else url = ADMIN_ENDPOINT.ALL_BLOG;
      return await axiosClient.get(url);
    },
    fetchOneBlog: async (id: string): Promise<DataResponse<Blog>> => {
      const url = `${ADMIN_ENDPOINT.ONE_BLOG}/${id}`;
      return await axiosClient.get(url);
    },
    fetchConfirmedBlog: async (page?: number): Promise<DataResponse<Array<Blog>>> => {
      let url = "";
      if (page) url = `${ADMIN_ENDPOINT.CONFIRMED_BLOG}?page=${page}`;
      else url = ADMIN_ENDPOINT.CONFIRMED_BLOG;
      return await axiosClient.get(url);
    },
    fetchPendingBlog: async (page?: number): Promise<DataResponse<Array<Blog>>> => {
      let url = "";
      if (page) url = `${ADMIN_ENDPOINT.PENDING_BLOG}?page=${page}`;
      else url = ADMIN_ENDPOINT.PENDING_BLOG;
      return await axiosClient.get(url);
    },
    updateOneBlog: async (payload: BlogPayload): Promise<DataResponse<Blog>> => {
      const url = `${ADMIN_ENDPOINT.UPDATE_BLOG}`;
      return await axiosClient.put(url, payload);
    },
    acceptOneBlog: async (id?: string): Promise<DataResponse<Blog>> => {
      if (!id) return;
      const url = `${ADMIN_ENDPOINT.CONFIRMED_BLOG}`;
      return await axiosClient.put(url, { "_id": id });
    },
    denyOneBlog: async (id?: string): Promise<DataResponse<null>> => {
      if (!id) return;
      const url = `${ADMIN_ENDPOINT.CONFIRMED_BLOG}`;
      return await axiosClient.delete(url, { data: { "_id": id } });
    },
    deleteOneBlog: async (id?: string): Promise<DataResponse<null>> => {
      if (!id) return;
      const url = `${ADMIN_ENDPOINT.DELETE_BLOG}/${id}`;
      return await axiosClient.delete(url);
    },
  };