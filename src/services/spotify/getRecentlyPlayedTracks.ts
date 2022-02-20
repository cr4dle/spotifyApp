import { Artist } from "@/types/common/Artist";
import { RecentlyPlayedTracksResponse } from "@/types/RecentlyPlayedTracksResponse";
import axios, { AxiosResponse } from "axios";

// TODO shared same instance of axios
// TODO check for certain response status code and redirect to unauth page (401)
// TODO create unauth page
export const getRecentlyPlayedTracks: (
  access_token: string
) => Promise<RecentlyPlayedTracksResponse> = async (access_token) => {
  const response: AxiosResponse<RecentlyPlayedTracksResponse> =
    await axios.get<RecentlyPlayedTracksResponse>(
      `${process.env.VUE_APP_SPOTIFY_BASE}/${process.env.VUE_APP_SPOTIFY_VERSION}/${process.env.VUE_APP_SPOTIFY_PLAYER_RESOURCE}/recently-played`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

  //   console.log(response.data.items);

  // TODO: it will became a Vuex getter
  const recentlyPlayedArtist: Artist[] = response.data.items.flatMap(
    (item) => item.track.artists
  );
  //   console.log(recentlyPlayedArtist);
  return response.data;
};
