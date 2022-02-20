import { LocalStorage } from "@/types/LocalStorage";

export const localStorage: LocalStorage = {
  get(key: string): string | null {
    return window.localStorage.getItem(key);
  },
  set(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  },
  remove(key: string): void {
    window.localStorage.removeItem(key);
  },
  clear(): void {
    window.localStorage.clear();
  },
};
