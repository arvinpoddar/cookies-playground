"use client";

import { useEffect, useState } from "react";
import {
  disableDraftMode,
  setCrossSiteCookie,
  setPartitionedCookie,
  setPersistentCrossSiteCookie,
  setPrimaryCookie,
} from "./actions";
import Link from "next/link";

function getToken() {
  return Math.random().toString(36).substring(2);
}

type Props = {
  draftMode?: boolean;
};

const buttonClass =
  "rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed";

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

      <div className="flex flex-wrap gap-3">
        <button
          className={buttonClass}
          onClick={() => setPrimaryCookie(getToken())}
        >
          Set Primary Cookie
        </button>

        <button
          className={buttonClass}
          onClick={() => setCrossSiteCookie(getToken())}
        >
          Set Cross-Site Cookie
        </button>

        <button
          className={buttonClass}
          onClick={() => setPersistentCrossSiteCookie(getToken())}
        >
          Set Cross-Site Cookie (1 year)
        </button>

        <button
          className={buttonClass}
          onClick={() => setPartitionedCookie(getToken())}
        >
          Set Partitioned Cookie
        </button>

        <button
          className={buttonClass}
          onClick={() => setCounter((prev) => prev + 1)}
        >
          Count: {counter}
        </button>

        <button className={buttonClass} onClick={() => disableDraftMode()}>
          Disable draft mode
        </button>

        {/* Request storage access */}
        <button
          className={buttonClass}
          onClick={() => requestStorageAccess()}
          disabled={hasStorageAccess !== false}
        >
          Request permissions
        </button>

        <Link href="/mirror">
          <button className={buttonClass}>Link to /mirror</button>
        </Link>
      </div>
    </div>
  );
}
