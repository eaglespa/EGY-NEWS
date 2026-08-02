const KEY = "egy-bookmarks";

function readSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) return [];
    return arr.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

let cache: string[] = [];

function emit() {
  cache = readSlugs();
  window.dispatchEvent(new Event("egy-bookmarks"));
}

export function subscribe(cb: () => void): () => void {
  const onStorage = () => {
    cache = readSlugs();
    cb();
  };
  window.addEventListener("egy-bookmarks", cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("egy-bookmarks", cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): string[] {
  return cache;
}

export function getServerSnapshot(): string[] {
  return [];
}

export function isSaved(slug: string): boolean {
  return readSlugs().includes(slug);
}

export function toggleSaved(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const list = readSlugs();
  const next = list.includes(slug)
    ? list.filter((s) => s !== slug)
    : [slug, ...list];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
  emit();
  return next.includes(slug);
}

export function getSavedSlugs(): string[] {
  return readSlugs();
}
