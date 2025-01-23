import { draftMode } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret == null || secret !== process.env.DRAFT_MODE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  return new Response("Draft mode [ENABLED]");
}
