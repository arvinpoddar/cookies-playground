export type CookieSettings = {
  name: string;
  value: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  partitioned?: boolean;
  expires?: Date;
};

export function getToken() {
  return Math.random().toString(36).substring(2);
}

export function isSameSite(val: unknown): val is CookieSettings["sameSite"] {
  const valid = ["lax", "strict", "none"] as unknown[];
  if (valid.includes(val)) return true;
  return false;
}

export function mapCookieSettingsSameSite(val: CookieSettings["sameSite"]) {
  switch (val) {
    case "lax":
      return "Lax";
    case "strict":
      return "Strict";
    case "none":
      return "None";
    default:
      return undefined;
  }
}

export function setLocalCookie(cookie: CookieSettings) {
  const { name, value, secure, sameSite, partitioned, expires } = cookie;

  let res = `local-${name}=${value}; `;

  if (secure) {
    res += "Secure; ";
  }

  const parsedSameSite = mapCookieSettingsSameSite(sameSite);
  if (parsedSameSite) {
    res += `SameSite=${parsedSameSite}; `;
  }

  if (partitioned) {
    res += "Partitioned; ";
  }

  if (expires) {
    res += `Expires=${expires.toUTCString()}`;
  }

  document.cookie = res;

  console.log({ documentCookie: document.cookie });
}
