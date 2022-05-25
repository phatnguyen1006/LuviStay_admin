export enum IGender {
  male = "male",
  female = "female",
}

export type User = {
  username: string;
  email: string;
  avatar: string;
  gender: IGender;
  phone: string;
  dob: Date;
};
