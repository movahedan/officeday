export function parseCookies(cookieString: string | undefined, key: string) {
  const cookies: { [key: string]: string } = {};
  if (!cookieString) {
    return undefined;
  }

  const cookiePairs = cookieString.split("; ");
  cookiePairs.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[key] = value;
  });

  return cookies[key];
}
