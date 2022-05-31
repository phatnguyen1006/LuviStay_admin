export const ADMIN_ENDPOINT = {
  // admin
  ADMIN_SIGNIN: "/admin/login-admin-account",
  // apartment
  ALL_APARTMENT: "/apartment/all",
  NEW_APARTMENT: "/apartment/all",
  // user
  ALL_USER: "/user/user-list",
  ONE_USER: "/user/get", // :id
  NEW_USER: "/user/add",
  UPDATE_USER: "/user/update",
  DELETE_USER: "/user/delete", // :id
  // blog
  ALL_BLOG: "/blog/all",
  ONE_BLOG: "/blog/detail", // :id
  UPDATE_BLOG: "/blog/update-admin",
  CONFIRMED_BLOG: "/blog/confirm",
  PENDING_BLOG: "/blog/pending",
  DELETE_BLOG: "/blog/delete", // :id
  // utils
  UPLOAD: "/blog/upload",
};

export const CLIENT_ENDPOINT = {
  BLOG: "/blog", // :id,
};
