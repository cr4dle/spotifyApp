import { implicitGrant } from "./implicitGrant";
import { getProfile } from "./getProfile";
import { getRecentlyPlayedTracks } from "./getRecentlyPlayedTracks";
import { getRecentlyPlayedTracksPaged } from "./getRecentlyPlayedTracksPaged";
import { getCurrentlyPlaying } from "./getCurrentlyPlaying";

export const spotify = {
  getProfile,
  implicitGrant,
  getRecentlyPlayedTracksPaged,
  getRecentlyPlayedTracks,
  getCurrentlyPlaying,
};
