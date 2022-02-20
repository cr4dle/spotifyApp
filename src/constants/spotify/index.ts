import { SpotifyScopes } from "@/types/spotifyScropes";

export const SPOTIFY: SpotifyScopes = {
  IMAGES: "ugc-image-upload",
  SPOTIFY_CONNECT: {
    USER_READ_PLAYBACK_STATE: "user-read-playback-state",
    USER_MODIFY_PLAYBACK_STATE: "user-modify-playback-state",
    USER_READ_CURRENTLY_PLAYING: "user-read-currently-playing",
  },
  USERS: {
    USER_READ_PRIVATE: "user-read-private",
    USER_READ_EMAIL: "user-read-email",
  },
  FOLLOW: {
    USER_FOLLLOW_MODIFY: "user-follow-modify",
    USER_FOLLOW_READ: "user-follow-read",
  },
  LIBRARY: {
    USER_LIBRARY_MODIFY: "user-library-modify",
    USER_LIBRARY_READ: "user-library-read",
  },
  PLAYBACK: {
    STREAMING: "streaming",
    APP_REMOTE_CONTROL: "app-remote-control",
  },
  LISTENING_HISTORY: {
    USER_READ_PLAYBACK_POSITION: "user-read-playback-position",
    USER_TOP_READ: "user-top-read",
    USER_READ_RECENTLY_PLAYED: "user-read-recently-played",
  },
  PLAYLISTS: {
    PLAYLIST_MODIFY_PRIVATE: "playlist-modify-private",
    PLAYLIST_READ_COLLABORATIVE: "playlist-read-collaborative",
    PLAYLIST_READ_PRIVATE: "playlist-read-private",
    PLAYLIST_MODIFY_PUBLIC: "playlist-modify-public",
  },
};
