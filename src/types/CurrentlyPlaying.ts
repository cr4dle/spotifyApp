import { Album } from "./common/Album";
import { Artist } from "./common/Artist";
import { Context } from "./common/Context";
import { ExternalIds } from "./common/ExternalIds";
import { ExternalUrls } from "./common/ExternalUrls";

export interface CurrentlyPlaying {
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Item;
  currently_playing_type: string;
  actions: Actions;
  is_playing: boolean;
}

export interface Item {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: any;
  track_number: number;
  type: string;
  uri: string;
}

export interface Actions {
  disallows: Disallows;
}

export interface Disallows {
  resuming: boolean;
  skipping_prev: boolean;
}
