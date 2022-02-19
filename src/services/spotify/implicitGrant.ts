import { STATE_KEY } from "@/constants";
import { generateRandomString } from "@/utils";

export const implicitGrant: () => void = () => {
  const client_id = "4b24cfb3e238464fbc28f5d54955f08b";
  const redirect_uri = "https://localhost:8080/about";

  const state: string = generateRandomString();

  localStorage.setItem(STATE_KEY, state);
  const scope = "user-read-private user-read-email user-read-recently-played";

  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    client_id
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&state=${encodeURIComponent(state)}`;

  window.location = url;
};
