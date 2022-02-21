import { SPOTIFY, STATE_KEY } from "@/constants";
import { generateRandomString, localStorage } from "@/utils";

export const implicitGrant: () => void = () => {
  const state: string = generateRandomString();

  localStorage.set(STATE_KEY, state);
  const scope = `${SPOTIFY.USERS.USER_READ_PRIVATE} ${SPOTIFY.USERS.USER_READ_EMAIL} ${SPOTIFY.LISTENING_HISTORY.USER_READ_RECENTLY_PLAYED} ${SPOTIFY.SPOTIFY_CONNECT.USER_READ_CURRENTLY_PLAYING}`;

  const url = `${
    process.env.VUE_APP_SPOTIFY_ACCOUNTS_BASE
  }/authorize?response_type=token&client_id=${encodeURIComponent(
    process.env.VUE_APP_SPOTIFY_CLIENT_ID
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    process.env.VUE_APP_SPOTIFY_REDIRECT_URI
  )}&state=${encodeURIComponent(state)}`;

  // @ts-ignore
  window.location = url;
};
