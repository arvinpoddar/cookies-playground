"use client";

import { useEffect, useState } from "react";
import { disableDraftMode, setToken } from "./actions";

type Props = {
  draftMode?: boolean;
};

export function Toolbar({ draftMode = false }: Props) {
  const [counter, setCounter] = useState(0);

  const [hasStorageAccess, setHasStorageAccess] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    document.hasStorageAccess().then((hasStorageAccess) => {
      setHasStorageAccess(hasStorageAccess);
    });
  }, []);

  function requestStorageAccess() {
    document
      .requestStorageAccess()
      .then(() => setHasStorageAccess(true))
      .catch((err) => {
        console.error(err);
        setHasStorageAccess(false);
      });
  }

  return (
    <div className="flex items-center gap-5">
      <div className="font-mono font-bold text-xs border-r pr-6 border-gray-500">
        <div>Draft Mode: {draftMode ? "true" : "false"}</div>
        <div>
          Storage Access:{" "}
          {hasStorageAccess == null
            ? "pending"
            : hasStorageAccess
            ? "granted"
            : "denied"}
        </div>
      </div>

      <div className="flex-1 flex items-center gap-3">
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          Count: {counter}
        </button>

        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => setToken((Math.random() * 1000000).toFixed())}
        >
          Trigger server action
        </button>

        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => disableDraftMode()}
        >
          Disable draft mode
        </button>

        {/* Request storage access */}
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 disabled:opacity-50"
          onClick={() => requestStorageAccess()}
          disabled={hasStorageAccess !== false}
        >
          Request permissions
        </button>
      </div>
    </div>
  );
}
