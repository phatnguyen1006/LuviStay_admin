export enum IGender {
  male = "male",
  female = "female",
}

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  gender: IGender;
  phone: string;
  dob: string;
};

export type UserPayload = {
  _id?: string;
  username: string;
  password?: string;
  email: string;
  gender: IGender;
  phone: string;
  dob: string;
}