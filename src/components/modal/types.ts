import { ReactNode } from "react";

export interface IProps {
  visible: boolean;
  hideModal: () => void;
  title: string | ReactNode;
  description?: string | ReactNode;
  callback?: () => void;
}

export interface IIdea {
  id: string;
  title: string;
  content: string;
  status: IStatus;
  studentId: string;
  categoryId: string;
  is_favourite: boolean;
  round_1: IStatus;
  round_2?: IStatus;
  round_3?: IStatus;
  Category: {
    slug: string;
  };
  student: {
    name: string;
  };
}

export interface IResIdea {
  result: Array<IIdea>;
  total: number;
}

export interface ICountIdea {
  pending: number;
  accepted: number;
  rejected: number;
}

export enum IStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}
