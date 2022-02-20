import { SpotifyAuth } from "@/types/SpotifyAuth";

export const getHashParams: () => SpotifyAuth = () => {
  const hashParams: SpotifyAuth = {} as SpotifyAuth;
  let e: RegExpExecArray | null;
  const r: RegExp = new RegExp(/([^&;=]+)=?([^&;]*)/g),
    q: string = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1] as keyof SpotifyAuth] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
