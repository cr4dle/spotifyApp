import { Album } from "./common/Album";
import { Artist } from "./common/Artist";
import { Context } from "./common/Context";
import { ExternalIds } from "./common/ExternalIds";
import { ExternalUrls } from "./common/ExternalUrls";

export interface RecentlyPlayedTracksResponse {
  items: Item[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Item {
  track: Track;
  played_at: string;
  context: Context;
}

export interface Track {
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
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
export interface Cursors {
  after: string;
  before: string;
}
