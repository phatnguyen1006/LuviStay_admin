import { Apartment } from "app/model";

export interface IApartmentPayload {}

export interface IApartmentResponsePayload {
  success: boolean;
  message: string;
  data: Array<Apartment> | null;
}

export type ApartmentData = {
  apartments: Array<Apartment> | null;
};
