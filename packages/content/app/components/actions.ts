"use server";

import { cookies, draftMode } from "next/headers";
import { CookieSettings } from "./cookie-settings";

export async function setRemoteCookie(settings: CookieSettings) {
  (await cookies()).set({ ...settings, name: `server-${settings.name}` });
}

export async function disableDraftMode(): Promise<void> {
  return (await draftMode()).disable();
}
