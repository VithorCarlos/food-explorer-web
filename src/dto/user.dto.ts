import { ROLE } from "@/utils/enums/role";

export interface UserDTO {
  name: string;
  email: string;
  role: ROLE;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface TokensDTO {
  accessToken: string;
  refreshToken: string;
}
