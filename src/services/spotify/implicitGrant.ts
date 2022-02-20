import { SPOTIFY, STATE_KEY } from "@/constants";
import { generateRandomString } from "@/utils";

export const implicitGrant: () => void = () => {
  const client_id = "4b24cfb3e238464fbc28f5d54955f08b";
  const redirect_uri = "https://localhost:8080/main";

  const state: string = generateRandomString();

  localStorage.setItem(STATE_KEY, state);
  const scope = `${SPOTIFY.USERS.USER_READ_PRIVATE} ${SPOTIFY.USERS.USER_READ_EMAIL} ${SPOTIFY.LISTENING_HISTORY.USER_READ_RECENTLY_PLAYED} ${SPOTIFY.SPOTIFY_CONNECT.USER_READ_CURRENTLY_PLAYING}`;

  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    client_id
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${encodeURIComponent(state)}`;

  window.location = url;
};
