import { RequestErrorApi } from "@/utils/errors/request-error";

interface MakeRequestProps {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: Record<string, any>;
  token?: string;
  init?: RequestInit;
}

interface ResponseProps<T> {
  statusCode: number;
  data: T;
}

export const makeFetch = async <T>({
  url,
  method,
  body,
  token,
  init,
}: MakeRequestProps): Promise<ResponseProps<T>> => {
  const bodyConverted = JSON.stringify({ ...body });
  try {
    const response = await fetch(url, {
      method,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      ...(body && { body: bodyConverted }),
      ...init,
    });

    const statusCode = response.status;
    if (!response.ok) {
      const { message } = await response.json();
      throw new RequestErrorApi(message, statusCode);
    }

    const data: T = await response.json().catch(() => undefined);

    return {
      statusCode,
      ...(data && { data }),
    };
  } catch (err) {
    if (err instanceof RequestErrorApi) {
      throw err;
    }

    throw new Error(
      "Ocorreu um erro inesperado, por favor, tente novamente mais tarde!",
    );
  }
};
