import { jwtDecode } from "jwt-decode";
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
    const { role } = jwtDecode(accessToken) as Props;

    return { role };
  }

  return null;
};
