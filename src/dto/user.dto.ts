import { ROLE } from "@/utils/enums/role";

export interface UserDTO {
  name: string;
  email: string;
  role: ROLE;
  created_at: Date;
  updated_at: Date;
}
