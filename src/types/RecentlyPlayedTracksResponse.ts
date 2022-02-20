import { Context } from "./common/Context";
import { Track } from "./common/Track";

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

export interface Cursors {
  after: string;
  before: string;
}
