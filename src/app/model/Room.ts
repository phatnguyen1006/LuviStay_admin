export type Room = {
  isPending: boolean;
  _id: string;
  name: string;
  apartmentId: string;
  price: number;
  bedName: string;
  capacity: number;
  square: string | number;
  rating: number;
  thumbnail: string;
  isAvailable: boolean;
  facilities: Array<string>;
};