import { User } from "app/model";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  currentUser?: User;
  refetchUserData: () => void;
}
