import { AdminRole } from "../definitions/Enum";

export interface AdminModel {
    role:AdminRole;
    token:string;
}
