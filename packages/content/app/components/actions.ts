"use server";

import { cookies, draftMode } from "next/headers";

const COOKIE_NAME = "myToken";

export async function getToken(): Promise<string | null> {
  return (await cookies()).get(COOKIE_NAME)?.value ?? null;
}

export async function setToken(value: string): Promise<boolean> {
  (await cookies()).set({ name: COOKIE_NAME, value });
  return true;
}

export async function disableDraftMode(): Promise<void> {
  return (await draftMode()).disable();
}
