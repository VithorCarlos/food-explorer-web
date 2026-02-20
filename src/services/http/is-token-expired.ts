export function isTokenExpired(token: string | undefined): boolean {
  if (!token) return true;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;

    const decodedJson = atob(payloadBase64);
    const payload = JSON.parse(decodedJson);

    const expDate = payload.exp * 1000;

    return Date.now() >= expDate - 10000;
  } catch (error) {
    console.error("Erro ao decodificar token no middleware", error);
    return true;
  }
}
