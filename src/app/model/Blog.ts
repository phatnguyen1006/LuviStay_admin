import { User } from "./User";

export type Blog = {
  _id: string;
  author: User;
  pictures: string[];
  content: string;
  date: string;
  comments: string;
  isConfirm: boolean;
};

export type BlogPayload = {
  _id?: string;
  author?: User;
  pictures?: string[];
  content?: string;
  date?: string;
  comments?: string;
  isConfirm?: boolean;
}