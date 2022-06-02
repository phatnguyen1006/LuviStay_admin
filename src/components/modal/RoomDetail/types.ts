import { Room } from "app/model";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  currentRoom: Room;
  refetchRoomData: () => void;
}

export enum IRoomStatus {
  available = "Available",
  unavailable = "Unavailable",
}
