import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();

  const cookies = requestHeaders
    .get("cookie")
    ?.split(";")
    .map((cookie) => {
      const [name, value] = cookie.split("=");
      return { [name]: value };
    });

  return (
    <div className="p-2">
      <div className="text-lg font-mono font-bold">All Headers:</div>
      <div className="mb-4">
        <pre>
          <code>{JSON.stringify(requestHeaders, null, 2)}</code>
        </pre>
      </div>

      <div className="text-lg font-mono font-bold">Cookies:</div>
      <pre>
        <code>{JSON.stringify(cookies, null, 2)}</code>
      </pre>
    </div>
  );
}
