import { ROLE } from "@/utils/enums/role";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
  createdAt: Date;
  updatedAt: Date;
}
