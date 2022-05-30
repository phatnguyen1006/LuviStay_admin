import { Blog } from "app/model";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  currentBlog: Blog;
  refetchBlogData: () => void;
}
