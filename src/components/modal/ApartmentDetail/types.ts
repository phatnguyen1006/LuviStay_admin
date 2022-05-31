import { Apartment } from "app/model";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  currentApartment: Apartment;
  refetchApartmentData: () => void;
}
