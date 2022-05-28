import { userAPI } from "app/api/user";
import { User } from "app/model";

export const getUserQuery = async (
  key,
  page?: number
): Promise<Array<User>> => {
  try {
    const response = await userAPI.fetchAllUser(page ? page : null);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch users");
  }
};

export const getOneUserQuery = async (
  key,
  id: string
): Promise<User> => {
  try {
    const response = await userAPI.fetchOneUser(id);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch user by id");
  }
};

// const data: User[] = [
//   {
//     _id: "1",
//     username: "Nguyễn Trg Pht",
//     phone: "0987654321",
//     email: "19521998@gm.uit.edu.vn",
//     avatar:
//       "https://bigdata-vn.com/wp-content/uploads/2021/09/1632240700_12_Anh-nen-dep-cho-iPhone.jpg",
//     gender: "male",
//     dob: "19/2/2020",
//   },
//   {
//     _id: "2",
//     username: "Nguyễn Ngọc Khôi",
//     phone: "0987654321",
//     email: "19521233@gm.uit.edu.vn",
//     avatar:
//       "https://bigdata-vn.com/wp-content/uploads/2021/09/1632240700_12_Anh-nen-dep-cho-iPhone.jpg",
//     gender: "male",
//     dob: "19/2/2020",
//   },
//   {
//     _id: "3",
//     username: "Nguyễn Lê Khôi",
//     phone: "0987654321",
//     email: "19521707bb@gm.uit.edu.vn",
//     avatar:
//       "https://bigdata-vn.com/wp-content/uploads/2021/09/1632240700_12_Anh-nen-dep-cho-iPhone.jpg",
//     gender: "male",
//     dob: "19/2/2020",
//   },
//   {
//     _id: "4",
//     username: "Some Name",
//     phone: "0987654321",
//     email: "something@gmail.com",
//     avatar:
//       "https://bigdata-vn.com/wp-content/uploads/2021/09/1632240700_12_Anh-nen-dep-cho-iPhone.jpg",
//     gender: "male",
//     dob: "19/2/2020",
//   },
//   {
//     _id: "5",
//     username: "No name",
//     phone: "0987654321",
//     email: "phtnguyen1998@gmail.com",
//     avatar:
//       "https://bigdata-vn.com/wp-content/uploads/2021/09/1632240700_12_Anh-nen-dep-cho-iPhone.jpg",
//     gender: "male",
//     dob: "19/2/2020",
//   },
// ];
