import { SPOTIFY_RECENTLY_TRACKS_LIMIT } from "@/constants";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";
import { AxiosInstance, AxiosResponse } from "axios";

export const getRecentlyPlayedTracksPaged: (
  axiosInstance: AxiosInstance,
  nextResourcePage: string,
) => Promise<RecentlyPlayedTracksResponse> =
  async (axiosInstance, nextResourcePage) => {
    const response: AxiosResponse<RecentlyPlayedTracksResponse> =
      await axiosInstance.get<RecentlyPlayedTracksResponse>(nextResourcePage, {
        params: {
          limit: SPOTIFY_RECENTLY_TRACKS_LIMIT,
        },
      });

    return response.data;
  };
