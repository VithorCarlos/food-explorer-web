import { cookies } from "next/headers";
import { ROLE } from "./enums/role";
import { TOKEN } from "./enums/cookie";

interface Props {
  role: ROLE;
}

export const getUserRole = async () => {
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get(TOKEN.ACCESS_TOKEN)?.value;

  if (accessToken) {
    const payloadBase64 = accessToken.split(".")[1];
    const decodedJson = atob(payloadBase64);
    const payload = JSON.parse(decodedJson);

    const { role } = payload as Props;

    return { role };
  }

  return null;
};
