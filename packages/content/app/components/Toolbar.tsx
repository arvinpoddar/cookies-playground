"use client";

import { useEffect, useState } from "react";
import { setToken } from "./actions";

export function Toolbar() {
  const [hasStorageAccess, setHasStorageAccess] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    document.hasStorageAccess().then((hasStorageAccess) => {
      console.log({ hasStorageAccess });
      setHasStorageAccess(hasStorageAccess);
    });
  }, []);

  function requestStorageAccess() {
    document.requestStorageAccess().then(() => {
      setHasStorageAccess(true);
    });
  }

  return (
    <div className="flex gap-4">
      <button
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        onClick={() => setToken((Math.random() * 1000000).toFixed())}
      >
        Trigger server action
      </button>

      {/* Request storage access */}
      {hasStorageAccess === false && (
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => requestStorageAccess()}
        >
          Request permissions
        </button>
      )}
    </div>
  );
}
