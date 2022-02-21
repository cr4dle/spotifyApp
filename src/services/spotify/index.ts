import { implicitGrant } from "./implicitGrant";
import { getProfile } from "./getProfile";
import { getRecentlyPlayedTracks } from "./getRecentlyPlayedTracks";
import { getCurrentlyPlaying } from "./getCurrentlyPlaying";

export const spotify = {
  getProfile,
  implicitGrant,
  getRecentlyPlayedTracks,
  getCurrentlyPlaying,
};
