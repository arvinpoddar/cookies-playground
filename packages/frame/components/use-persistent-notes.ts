import { useSyncExternalStore } from "react";

const STORAGE_KEY = "counter";

function subscribeToNotes(callback: () => void): () => void {
  function listener(event: StorageEvent) {
    if (event.key === STORAGE_KEY) callback();
  }

  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

function getNotes(): string {
  const isServer = !(typeof window != "undefined" && window.document);
  if (isServer) return "";
  const storedNotes = localStorage.getItem(STORAGE_KEY);
  return storedNotes ?? "";
}

function setNotes(notes: string) {
  const currentValue = getNotes();
  if (currentValue === notes) return;
  localStorage.setItem(STORAGE_KEY, notes);

  // Withouth this manual dispatch, the change to localstorage will not
  // be visible to the current tab. It will be automatically visible to
  // other tabs, however.
  window.dispatchEvent(
    new StorageEvent("storage", {
      key: STORAGE_KEY,
      oldValue: currentValue,
      newValue: notes,
    })
  );
}

export function usePersistentNotes() {
  const notes = useSyncExternalStore(subscribeToNotes, getNotes, getNotes);
  return [notes, setNotes] as const;
}
