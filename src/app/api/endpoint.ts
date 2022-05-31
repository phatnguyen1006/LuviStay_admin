export const ADMIN_ENDPOINT = {
  // admin
  ADMIN_SIGNIN: "/admin/login-admin-account",
  // apartment
  ALL_APARTMENT: "/apartment/all",
  ALL_USER: "/user/user-list",
  ONE_USER: "/user/get", // :id
  NEW_USER: "/user/add",
  UPDATE_USER: "/user/update",
  DELETE_USER: "/user/delete", // :id
  ALL_BLOG: "/blog/all",
  ONE_BLOG: "/blog/detail", // :id
  UPDATE_BLOG: "/blog/update",
  CONFIRMED_BLOG: "/blog/confirm",
  PENDING_BLOG: "/blog/pending",
  DELETE_BLOG: "/blog/delete", // :id
  UPLOAD: "/blog/upload",
  // ALL_BLOG: "/apartment/all",
};

export const CLIENT_ENDPOINT = {
  BLOG: "/blog", // :id,
};
