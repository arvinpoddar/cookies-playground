"use client";

import { useRef, useState } from "react";

type Props = {
  defaultUrl: string;
};

export function Frame({ defaultUrl }: Props) {
  const [urlInput, setUrlInput] = useState(() => defaultUrl);
  const [frameUrl, setFrameUrl] = useState(() => defaultUrl);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="h-full w-full flex flex-col gap-3 ">
      <form
        className="flex items-stretch gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setFrameUrl(urlInput);
        }}
      >
        <input
          value={urlInput}
          className="flex-1 p-2 border border-gray-300 text-gray-900 rounded"
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL"
        />
        <button
          className="py-2 px-4 bg-indigo-600 text-grey-100 rounded"
          type="submit"
        >
          Go
        </button>
      </form>
      <iframe
        ref={iframeRef}
        src={frameUrl}
        title="iframe"
        className="h-[70vh] w-full rounded-lg overflow-hidden border dark:border-gray-100 dark:shadow-gray-100 border-gray-600 shadow-gray-600 shadow-lg"
      />
    </div>
  );
}
