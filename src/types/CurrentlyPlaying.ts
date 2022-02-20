import { Context } from "./common/Context";
import { Track } from "./common/Track";

export interface CurrentlyPlaying {
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Track;
  currently_playing_type: string;
  actions: Actions;
  is_playing: boolean;
}

export interface Actions {
  disallows: Disallows;
}

export interface Disallows {
  resuming: boolean;
  skipping_prev: boolean;
}
