import { env } from "@/env";
import { RequestErrorApi } from "@/utils/errors/request-error";
import { showToast } from "@/utils/toast-message";
import { USER_ERRORS_TRANSLATE } from "@/utils/translations/user-errors-translate";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export const fetchLogin = async ({ email, password }: LoginUserRequest) => {
  const url = `${env.NEXT_PUBLIC_API_BASE_URL}/session`;

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new RequestErrorApi(data.message, response.status);
  }

  return response;
};
