import { Toolbar } from "./components/Toolbar";
import { draftMode, headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const draft = (await draftMode()).isEnabled;

  const cookies = requestHeaders
    .get("cookie")
    ?.split(";")
    .map((cookie) => {
      const [name, value] = cookie.split("=");
      return { [name]: value };
    });

  return (
    <div className="py-2 px-4 w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <div className="mt-4">
          <Toolbar draftMode={draft} />
        </div>

        <hr className="my-6 w-full border-t border-gray-500" />

        <div>
          <div className="text-lg font-mono font-bold">Cookies:</div>
          <div className="mb-4">
            <pre>
              <code>{JSON.stringify(cookies, null, 2)}</code>
            </pre>
          </div>

          <div className="text-lg font-mono font-bold">All Headers:</div>
          <div>
            <pre>
              <code>{JSON.stringify(requestHeaders, null, 2)}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
