"use client";

import { useRef, useState } from "react";

type Props = {
  defaultUrl: string;
};

export function Frame({ defaultUrl }: Props) {
  const [notes, setNotes] = useState("");

  const [history, setHistory] = useState<string[]>(() =>
    defaultUrl ? [defaultUrl] : []
  );

  const [urlInput, setUrlInput] = useState(() => defaultUrl);
  const [frameUrl, setFrameUrl] = useState(() => defaultUrl);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  function goToUrl(url: string) {
    if (url !== history.at(-1)) {
      setHistory([...history, url]);
      setFrameUrl(url);
      setUrlInput(url);
      return;
    }
    refresh();
  }

  function refresh() {
    if (iframeRef.current == null) return;
    iframeRef.current.src = iframeRef.current.src;
  }

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <form
        className="flex items-stretch gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          goToUrl(urlInput);
        }}
      >
        <button
          className="py-2 px-4 bg-indigo-600 text-grey-100 rounded"
          onClick={refresh}
        >
          Reload
        </button>
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
        className="h-[60vh] w-full rounded-lg overflow-hidden border dark:border-gray-100 border-gray-600 "
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full mt-5 p-2 border border-gray-300 text-gray-900 rounded text-sm resize-y"
        placeholder="Notes..."
      />
    </div>
  );
}
