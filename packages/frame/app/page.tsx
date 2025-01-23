import { Frame } from "@/components/frame";

const FALLBACK_URL = "https://nextjs.org";

export default function Home() {
  const defaultUrl = process.env.FRAME_DEFAULT_URL ?? FALLBACK_URL;

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Frame defaultUrl={defaultUrl} />
    </div>
  );
}
