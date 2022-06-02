export enum TagType {
  hotel = "hotel",
  motel = "motel",
  resort = "resort",
  homestay = "homestay",
  other = "other",
}

export type Apartment = {
  _id?: string;
  name: string;
  owner: string;
  address: {
    apartmentNumber: string;
    street: string;
    district: string;
    province: string;
    country: string;
  };
  thumbnail: string;
  pictures: string[];
  type: TagType;
  rating: number;
  description: string;
  voucher: string;
  isPending: boolean;
  isDisable: boolean;
};

export type ApartmentPayload = {
  _id?: string;
  name: string;
  owner?: string;
  address?: {
    apartmentNumber: string;
    street: string;
    district: string;
    province: string;
    country: string;
  };
  thumbnail?: string;
  pictures?: string[];
  type?: TagType;
  rating?: number;
  description?: string;
  voucher?: string;
  isPending?: boolean;
};
