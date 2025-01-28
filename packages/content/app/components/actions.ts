"use server";

import { cookies, draftMode } from "next/headers";

export async function setPrimaryCookie(value: string): Promise<boolean> {
  (await cookies()).set({ name: "firstClassToken", value });
  return true;
}

export async function setCrossSiteCookie(value: string): Promise<boolean> {
  (await cookies()).set({
    name: "crossSiteToken",
    value,
    sameSite: "none",
    secure: true,
  });
  return true;
}

export async function setPartitionedCookie(value: string): Promise<boolean> {
  (await cookies()).set({
    name: "partitionedCookie",
    value,
    partitioned: true,
    secure: true,
  });
  return true;
}

export async function disableDraftMode(): Promise<void> {
  return (await draftMode()).disable();
}
