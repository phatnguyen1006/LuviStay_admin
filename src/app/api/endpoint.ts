export const ADMIN_ENDPOINT = {
  // admin
  ADMIN_SIGNIN: "/admin/login-admin-account",
  // apartment
  ALL_APARTMENT: "/apartment/all",
  ONE_APARTMENT: "/apartment/detail", // :id
  NEW_APARTMENT: "/apartment/all",
  DELETE_APARTMENT: "/apartment/delete-apartment",
  ACCEPT_APARTMENT: "/apartment/confirm-pending-apartment", // ?apartmentId
  DENY_APARTMENT: "/apartment/remove-pending-apartment", // ?apartmentId
  // room
  ROOM_OF_APARTMENT: "/room/apartment", //:id
  AVAILABLE_ROOM: "/room/available-apartment",
  UPDATE_ROOM: "/room",
  DELETE_ROOM: "/room",
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
  // revenue
  MONTHLY_REVENUE: "/revenue/monthly", // ?year=2022&month=6
  YEARLY_REVENUE: "/revenue/yearly", // ?year=2022
  ALL_REVENUE: "/revenue/all-yearly",
  // utils
  UPLOAD: "/blog/upload",
};

export const CLIENT_ENDPOINT = {
  BLOG: "/blog", // :id,
};
