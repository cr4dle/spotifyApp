import { SPOTIFY_RECENTLY_TRACKS_LIMIT } from "@/constants";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";
import axios, { AxiosResponse } from "axios";

// TODO shared same instance of axios
// TODO check for certain response status code and redirect to unauth page (401)
// TODO create unauth page
export const getRecentlyPlayedTracksPaged: (
  access_token: string,
  nextResourcePage: string
) => Promise<RecentlyPlayedTracksResponse> = async (
  access_token,
  nextResourcePage
) => {
  const response: AxiosResponse<RecentlyPlayedTracksResponse> =
    await axios.get<RecentlyPlayedTracksResponse>(nextResourcePage, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
      params: {
        limit: SPOTIFY_RECENTLY_TRACKS_LIMIT
      }
    });

  return response.data;
};
