import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface MakeRequestProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  init?: RequestInit;
}

export const fetchWithAuth = async ({
  url,
  method,
  body,
  init,
}: MakeRequestProps) => {
  let session = await getServerSession(nextAuthOptions);

  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      accept: "application/json",
      ...(body && { "Content-Type": "application/json" }),
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...init,
  };

  return fetch(url, options);
};
