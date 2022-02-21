import { SPOTIFY_RECENTLY_TRACKS_LIMIT } from "@/constants";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";
import { AxiosInstance, AxiosResponse } from "axios";

export const getRecentlyPlayedTracks: (
  axiosInstance: AxiosInstance
) => Promise<RecentlyPlayedTracksResponse> = async (axiosInstance) => {
  const response: AxiosResponse<RecentlyPlayedTracksResponse> =
    await axiosInstance.get<RecentlyPlayedTracksResponse>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/${process.env.VUE_APP_SPOTIFY_PLAYER_RESOURCE}/recently-played`,
      {
        params: {
          limit: SPOTIFY_RECENTLY_TRACKS_LIMIT,
        },
      }
    );

  return response.data;
};
