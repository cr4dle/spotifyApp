export type SpotifyScopes = {
  IMAGES: string;
  SPOTIFY_CONNECT: {
    USER_READ_PLAYBACK_STATE: string;
    USER_MODIFY_PLAYBACK_STATE: string;
    USER_READ_CURRENTLY_PLAYING: string;
  };
  USERS: {
    USER_READ_PRIVATE: string;
    USER_READ_EMAIL: string;
  };
  FOLLOW: {
    USER_FOLLLOW_MODIFY: string;
    USER_FOLLOW_READ: string;
  };
  LIBRARY: {
    USER_LIBRARY_MODIFY: string;
    USER_LIBRARY_READ: string;
  };
  PLAYBACK: {
    STREAMING: string;
    APP_REMOTE_CONTROL: string;
  };
  LISTENING_HISTORY: {
    USER_READ_PLAYBACK_POSITION: string;
    USER_TOP_READ: string;
    USER_READ_RECENTLY_PLAYED: string;
  };
  PLAYLISTS: {
    PLAYLIST_MODIFY_PRIVATE: string;
    PLAYLIST_READ_COLLABORATIVE: string;
    PLAYLIST_READ_PRIVATE: string;
    PLAYLIST_MODIFY_PUBLIC: string;
  };
};
