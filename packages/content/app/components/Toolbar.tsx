"use client";

import { useEffect, useState } from "react";
import { disableDraftMode, setRemoteCookie } from "./actions";
import Link from "next/link";
import {
  type CookieSettings,
  isSameSite,
  setLocalCookie,
  getToken,
} from "./cookie-settings";

type Props = {
  draftMode?: boolean;
};

const buttonClass =
  "rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed";

const inputClass =
  "w-44 rounded text-gray-700 text-sm px-1 bg-white border border-gray-400";

const CookieProfiles = {
  FirstParty: "FirstParty",
  ThirdParty: "ThirdParty",
  Partitioned: "Partitioned",
} as const;

function getCookieFromProfile(
  profile: keyof typeof CookieProfiles
): CookieSettings {
  switch (profile) {
    case CookieProfiles.FirstParty:
      return { name: "firstParty", value: getToken() };
    case CookieProfiles.ThirdParty:
      return {
        name: "thirdParty",
        value: getToken(),
        sameSite: "none",
        secure: true,
      };
    case CookieProfiles.Partitioned:
      return {
        name: "partitioned",
        value: getToken(),
        partitioned: true,
        secure: true,
      };
  }
}

export function Toolbar({ draftMode = false }: Props) {
  const [counter, setCounter] = useState(0);

  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(() =>
    getCookieFromProfile(CookieProfiles.FirstParty)
  );

  function handleProfileSelection(profile: string) {
    switch (profile) {
      case CookieProfiles.FirstParty:
      case CookieProfiles.ThirdParty:
      case CookieProfiles.Partitioned:
        setCookieSettings(getCookieFromProfile(profile));
        break;
    }
  }

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
    <div className="flex items-stretch divide-x divide-gray-500">
      <div className="font-mono font-bold text-xs pr-5">
        <div>Draft Mode: {draftMode ? "true" : "false"}</div>
        <div className="mb-3">
          Storage Access:{" "}
          {hasStorageAccess == null
            ? "pending"
            : hasStorageAccess
            ? "granted"
            : "denied"}
        </div>
      </div>

      <div className="flex gap-3 px-5">
        <div className="flex flex-col gap-y-1 items-end">
          <label className="flex gap-1 items-center">
            <p className="text-sm">Presets: </p>
            <select
              className={inputClass}
              onChange={(e) => handleProfileSelection(e.target.value)}
            >
              <option value={CookieProfiles.FirstParty} label="First Party" />
              <option value={CookieProfiles.ThirdParty} label="Third Party" />
              <option value={CookieProfiles.Partitioned} label="Partitioned" />
            </select>
          </label>

          <hr className="border-t border-gray-500 w-full my-1" />

          <label className="flex gap-1 items-center">
            <p className="text-sm">Name: </p>
            <input
              placeholder="Cookie name"
              className={inputClass}
              value={cookieSettings.name}
              onChange={(e) =>
                setCookieSettings((val) => ({ ...val, name: e.target.value }))
              }
            />
          </label>

          <label className="flex gap-1 items-center">
            <p className="text-sm">Value: </p>
            <input
              placeholder="Cookie value"
              className={inputClass}
              value={cookieSettings.value}
              onChange={(e) =>
                setCookieSettings((val) => ({ ...val, value: e.target.value }))
              }
            />
          </label>

          <label className="flex gap-1 items-center">
            <p className="text-sm">SameSite: </p>
            <select
              className={inputClass}
              value={cookieSettings.sameSite ?? "unset"}
              onChange={(e) => {
                const res = isSameSite(e.target.value)
                  ? e.target.value
                  : undefined;
                setCookieSettings((val) => ({ ...val, sameSite: res }));
              }}
            >
              <option value="unset" label="Unset" />
              <option value="lax" label="Lax" />
              <option value="strict" label="Strict" />
              <option value="none" label="None" />
            </select>
          </label>

          <div className="flex gap-3">
            <label className="flex gap-1 items-center">
              <p className="text-sm">Secure: </p>
              <input
                placeholder="Secure"
                className="size-4"
                type="checkbox"
                value={cookieSettings.secure ? "on" : "off"}
                checked={cookieSettings.secure ?? false}
                onChange={(e) =>
                  setCookieSettings((val) => ({
                    ...val,
                    secure: e.target.checked,
                  }))
                }
              />
            </label>

            <label className="flex gap-1 items-center">
              <p className="text-sm">Partitioned: </p>
              <input
                placeholder="Partitioned"
                className="size-4"
                type="checkbox"
                value={cookieSettings.partitioned ? "on" : "off"}
                checked={cookieSettings.partitioned ?? false}
                onChange={(e) =>
                  setCookieSettings((val) => ({
                    ...val,
                    partitioned: e.target.checked,
                  }))
                }
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            className={buttonClass}
            onClick={() => setRemoteCookie(cookieSettings)}
          >
            Set via Server
          </button>

          <button
            className={buttonClass}
            onClick={() => setLocalCookie(cookieSettings)}
          >
            Set via Local
          </button>

          <button
            className={buttonClass}
            onClick={() =>
              setCookieSettings((val) => ({ ...val, value: getToken() }))
            }
          >
            New token
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex gap-2 flex-1 flex-wrap pl-5">
          <button
            className={buttonClass}
            onClick={() => setCounter((prev) => prev + 1)}
          >
            Interactive: {counter}
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
    </div>
  );
}
