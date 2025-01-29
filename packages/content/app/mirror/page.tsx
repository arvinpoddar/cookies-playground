import Link from "next/link";
import Page from "../page";

export default async function MirrorPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="px-4 pt-3">
        <div className="flex gap-4 items-center">
          <h1 className="font-mono font-bold">Mirror route - </h1>
          <Link href="/" className="font-mono text-indigo-500 hover:underline">
            Back to home
          </Link>
        </div>

        <hr className="my-3 w-full border-t border-gray-500" />
      </div>
      <Page />
    </div>
  );
}
